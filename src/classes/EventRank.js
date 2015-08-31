import { assert } from '../util/';

// local references for math utils
const { PI: π, tanh, pow } = Math;


/**
 * Decay function for influence on potential of event sent by sender s ∈ P_i
 *  using time since event sent from s
 *
 * @param  {Number} Δts : Change in time since last last event sent by s
 * @param  {Number} G : Decay constant to weight sensitivity of new events
 * @return {Number}
 */
function g(Δts, G) {
  return (tanh((10*Δts)/(G*π) - π) + 1) / 2;
}



/**
 * Decay function for influence on potential of event sent by sender s ∈ P_i
 *  using time since last event recieved by r ∈ P_i from s
 *
 * @param  {Number} Δtr : time since last event recieved by r ∈ P_i from s
 * @param  {Number} H : Decay constant to weight sensitivity of new events
 * @return {Number}
 */
function h(Δtr, H) {
  return pow(2, (-Δtr) / H);
}



/**
 * Event Rank instance
 *
 * @return {EventRank}
 */
export default class EventRank {

  // export helper functions with class
  static g = g;
  static h = h;


  /**
   * Construct EventRank object
   *
   * @param  {Object} opts : weight parameters, correspondent set, events
   * @return {EventRank}
   */
  constructor(opts) {

    const {
      G=5,
      H=5,
      ƒ=0.3,
      correspondents,
      events
    } = opts;

    Object.assign(this, { G, H, ƒ, correspondents, events });
  }


  /**
   * Calculate new ranks given an additional event
   *
   * @param  {Object} event : { to, from, time }
   * @return {EventRank} this : return self for chaining
   */
  compute(time) {
    return time;
  }

  /**
   * Calculate new ranks given an additional event
   *
   * @param  {Object} event : { to, from, time }
   * @return {EventRank} this : return self for chaining
   */
  step(event) {

    // unpack model weight parameters + ranks + correspondents
    const { G, H, ƒ, ranks, correspondents } = this;

    const { time, to, from : sender } = event;
    const recipients = new Set(Array.isArray(to) ? to : [to]);
    const isParticipent = c => c === sender || recipients.has(c);

    // counts of participants + respondents
    const nP = recipients.size + 1;
    const nC = correspondents.length;

    const Δts = 1,
          Δtr = 1,
          α = ƒ * Tn * g(Δts, G) * h(Δtr, H);

    let Tn, ΣR;


    // changes in time must not be negative
    assert(Δts > 0, 'Δts must not be negative');
    assert(Δtr > 0, 'Δtr must not be negative');


    // first pass for potential totals
    for (let i = 0; i < nC; i++) {

      const c      = correspondents[i],
            cRanks = ranks[c],
            Rold   = cRanks[cRanks.length - 1];

      if (isParticipent(c)) {
        ΣR += Rold.value;
      } else {
        Tn += Rold.value;
      }

    }

    // sum of additive inverse of ranks of participants
    const ΣRbar = nP - ΣR;

    // second pass for rank computation
    for (let i = 0; i < nC; i++) {

      const c      = correspondents[i],
            cRanks = ranks[c],
            Rold   = cRanks[cRanks.length - 1];

      // mutable reference to value
      let value = Rold.value;

      if (isParticipent(c)) {
        value = value + α * ((1 - value) / ΣRbar)
      } else {
        value = value * (1 - (α / Tn));
      }

      // push new rank with given time
      cRanks.push({ value, time });

    }

    return this;

  }

}
