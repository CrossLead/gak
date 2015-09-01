/**
 * EventRank implementation
 *
 * Model adapted from "EventRank: A Framework for Ranking Time-Varying Networks"
 * (O’Madadhain & Smyth, 2005), utilizes 'Reply Model' of potential weights
 *
 * PDF: http://www.datalab.uci.edu/papers/linkkdd05-02.pdf
 */

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
   * @param  {Object} opts : weight parameters, correspondent set,
   *                         events (expected to be sorted by time)
   * @return {EventRank}
   */
  constructor(opts) {

    const {
      G=5,
      H=5,
      f=0.3,
      time=0,
      correspondents,
      events,
    } = opts;

    let { ranks } = opts;

    // start ranks for all = |C| if not present
    if (!ranks) {
      const value = 1 / correspondents.length;
      ranks = correspondents.reduce((o, c) => {
        o[c] = [ { value, time } ];
        return o;
      }, {});
    }

    // add properties
    Object.assign(this, {
      G, H, f,
      time,
      correspondents,
      events,
      ranks
    });
  }


  /**
   * Package EventRank in pojo for serializing / db storage
   *
   * @return {Object} plain object for serialization
   */
  serialize() {
    const out = {};

    for (const prop in this) {
      let p;
      if (!((p = this[prop]) instanceof Function)) {
        out[prop] = p;
      }
    }

    return out;
  }



  /**
   * Return json string of serialized EventRank
   *
   * @return {String} JSON representation of EventRank
   */
  toJson() {
    return JSON.stringify(this.serialize());
  }



  /**
   * Calculate new ranks given an additional event
   *
   * @param  {Object | Array<Object>} event : { to, from, time }
   * @param  {Number} time (optional)
   * @return {EventRank} this : return self for chaining
   */
  step(event, time=(event.time || this.time)) {

    //
    // TODO:
    //  [ ] allow arrays of events, need to be processed at same time
    //  [ ] compute time differentialsc
    //

    // unpack model weight parameters + ranks + correspondents
    const { G, H, f, ranks, correspondents } = this;

    // unpack event, create set of participants
    const { to, from : sender } = event;
    const recipients = new Set(Array.isArray(to) ? to : [to]);
    const isParticipent = c => c === sender || recipients.has(c);

    // counts of participants + respondents
    const nP = recipients.size + 1;
    const nC = correspondents.length;

    // time differentials
    const Δts = 1,
          Δtr = 1;


    // first pass for potential totals
    let Tn, ΣR;
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

    // potential transfer weight
    const α = f * Tn * g(Δts, G) * h(Δtr, H);

    // assert bounds of parameters
    assert(Δts > 0, 'Δts must not be negative');
    assert(Δtr > 0, 'Δtr must not be negative');
    assert(α <= 1 && α >= 0, 'α must be in (0, 1)');

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
