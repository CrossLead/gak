/**
 * EventRank implementation
 *
 * Model adapted from "EventRank: A Framework for Ranking Time-Varying Networks"
 * (O’Madadhain & Smyth, 2005), utilizes 'Reply Model' of potential weights
 *
 * PDF: http://www.datalab.uci.edu/papers/linkkdd05-02.pdf
 */


/* TODO:

  1. Get working model from array of formatted events

  2. Enhancements
    - Formatting method
    - allow progressive adding of events
    - collapse array of events in time range into single time period
    - keep track of time conversion

  3. Efficiency
    - Lazily update non participent scores

*/



import { assert, ensureArray } from '../util/';

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

  static getCorrespondents(data) {
    const outSet = new Set();
    data.forEach(event => {
      outSet.add(event.from);
      outSet.add(...ensureArray(event.to));
    });
    return [...outSet];
  }


  /**
   * Construct EventRank object
   *
   * @param  {Object} opts : weight parameters, correspondent set,
   *                         events (expected to be sorted by time)
   * @return {EventRank}
   */
  constructor(opts) {

    // default options
    const {
      G=1,
      H=1,
      f=0.3,
      model='baseline',
      time=0,
      correspondanceMatrix={},
      events=[],
    } = opts;

    // get ranks if passed
    let { ranks, correspondents } = opts;

    if (!correspondents && events) {
      correspondents = EventRank.getCorrespondents(events);
    }

    // start ranks for all = |C| if not present
    if (!ranks && correspondents) {
      const value = 1 / correspondents.length;
      ranks = correspondents.reduce((o, c) => {
        o[c] = [ { value, time } ];
        return o;
      }, {});
    }


    // add properties
    Object.assign(this, {
      G, H, f, model,
      time,
      correspondents,
      correspondanceMatrix,
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
  toJson(pretty) {
    const args = [this.serialize()];
    if (pretty) {
      args.push(...[null, 2])
    }
    return JSON.stringify(...args);
  }


  log() {
    console.log(this.ranks);
    return this;
  }



  /**
   * Calculate new ranks given an additional event
   *
   * @param  {Object | Array<Object>} event : { to, from, time }
   * @param  {Number} time (optional)
   * @return {EventRank} this : return self for chaining
   */
  step(event) {

    // unpack model weight parameters + ranks + correspondents
    const {
      G, H, f,
      ranks,
      correspondents,
      correspondanceMatrix : CM,
      model
    } = this;

    // unpack event, create set of participants
    const { to, from : sender, time } = event;
    const recipientArray = ensureArray(to);
    const recipients = new Set(recipientArray);
    const isParticipent = c => c === sender || recipients.has(c);

    // counts of participants + respondents
    const nP = recipients.size + 1;
    const nC = correspondents.length;

    // time differentials (for reply model)
    let Δts, Δtr;
    if (model === 'reply') {

      // Last time an email was sent by this sender
      const lagSender = CM[sender] = CM[sender] || {};
      Δts = time - (lagSender.sent || 0);
      lagSender.sent = time;

      // Most recent time any of the recipients recieved an email from the sender
      let trMin = 0, trSender;
      recipientArray.forEach(recipient => {
        const correspondence = CM[recipient] = CM[recipient] || {};
        const tr = correspondence.recieved = correspondence.recieved || {};
        if ((trSender = tr[sender]) && trSender > trMin) {
          trMin = trSender;
        }
        // update most recient recieved time
        tr[sender] = time;
      });
      Δtr = time - trMin;

      assert(Δts > 0, 'Δts must not be negative: Δts = ' + Δts);
      assert(Δtr > 0, 'Δtr must not be negative: Δtr = ' + Δtr);
    }


    // first pass for potential totals
    let Tn = 0, ΣR = 0;
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
    let α;
    if (model === 'reply') {
      α = f * Tn * g(Δts, G) * h(Δtr, H);
    } else {
      α = f * Tn
    }

    assert(α <= 1 && α >= 0, 'α must be in (0, 1): α = ' + α);

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
