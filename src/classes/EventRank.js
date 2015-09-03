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

*/


import { assert, ensureArray } from '../util/';

// local references for math utils
const { PI: π, tanh, pow } = Math;
const oneDay = 24*60*60*1000;

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
      ensureArray(event.to).forEach(::outSet.add)
    });
    return Array.from(outSet);
  }

  static startRanks(correspondents) {
    const value = 1 / correspondents.length,
          time = 0;
    return correspondents.reduce((o, c) => (o[c] = { value, time }, o), {});
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
      G=oneDay,
      H=oneDay,
      f=0.3,
      model='baseline',
      time=0,
      events=[],
    } = opts;

    // get ranks if passed
    let { ranks, correspondents, correspondanceMatrix } = opts;

    if (!correspondents && events) {
      correspondents = EventRank.getCorrespondents(events);
    }

    // start ranks for all = |C| if not present
    if (!ranks && correspondents) {
      ranks = EventRank.startRanks(correspondents);
    }

    if (!correspondanceMatrix) {
      correspondanceMatrix = correspondents.reduce((o, c) => (o[c] = {}, o), {});
    }


    // add properties
    Object.assign(this, {
      G, H, f, model,
      time,
      correspondents,
      correspondanceMatrix,
      events,
      ranks,
      Vα : []
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


  toMatrix() {
    const { ranks, correspondents } = this;
    const out = [];
    correspondents.forEach(name => {
      const record = { name };
      ranks[name].forEach(rank => {
        record[rank.time] = rank.value;
      });
      out.push(record);
    })
    return out;
  }


  log() {
    console.log(this.ranks);
    return this;
  }


  reset() {
    this.ranks = EventRank.startRanks(this.correspondents);
    return this;
  }


  compute() {
    this.reset().events.map(::this.step);
    return this;
  }

  /**
   * Ranks of individuals who were not participants in the previous event
   * need to be updated, apply a non-participant rank adjustment
   * for each period:
   *      d ∉ P_i :    R_i(d) = R_i-1(d) * (1 - (α_i / Tn_i))
   */
  catchUp(participant) {
    const { correspondanceMatrix: CM, ranks, Vα } = this;
    const iα = Vα.length,
          rank = ranks[participant];

    let i = CM[participant].lastUpdate || 0,
        value = rank.value;

    while(i < iα) {
      const αLag = Vα[i++];
      value *= (1 - αLag.value);
      rank.value = value
      rank.time = αLag.time;
    }

    // update index of last update
    CM[participant].lastUpdate = iα;
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
      correspondanceMatrix : CM,
      model,
      Vα
    } = this;

    // unpack event, create set of participants
    const { to, from : sender, time } = event;
    const recipients = new Set(ensureArray(to));
    recipients.delete(sender); // if the sender sends themself an email...
    const recipientArray = Array.from(recipients);

    // counts of participants + total correspondents
    const nP = recipients.size + 1;

    // catch up recipients with lazy ranks
    this.catchUp(sender);
    recipientArray.forEach(::this.catchUp)

    // time differentials (for reply model)
    let Δts, Δtr;
    if (model === 'reply') {

      // Last time an email was sent by this sender
      const lagSender = CM[sender];
      Δts = time - (lagSender.sent || 0);
      lagSender.sent = time;

      // Most recent time any of the recipients recieved an email from the sender
      let trMin = 0, trSender;
      recipientArray.forEach(recipient => {
        const correspondence = CM[recipient];
        const tr = correspondence.recieved = correspondence.recieved || {};
        if ((trSender = tr[sender]) && trSender > trMin) {
          trMin = trSender;
        }
        // update most recient recieved time
        tr[sender] = time;
      });
      Δtr = time - trMin;

      assert(Δts >= 0, 'Δts must not be negative: Δts = ' + Δts);
      assert(Δtr >= 0, 'Δtr must not be negative: Δtr = ' + Δtr);
    }


    // start sum with sender rank
    let ΣR = ranks[sender].value;
    const lastTimeSender = ranks[sender].time;
    recipientArray.forEach(recipient => {
      ΣR += ranks[recipient].value;
      assert(
        ranks[recipient].time === lastTimeSender,
        'Last event time should be equal for all participants'
      );
    });

    if (ΣR > 1) {
      console.log('\n', ranks);
    }

    assert(ΣR <= 1 && ΣR >= 0, 'ΣR must be in (0, 1): ΣR = ' + ΣR);

    // current total of non participants is one minus participent potential
    const Tn = 1 - ΣR;

    // potential transfer weight
    let α;
    if (model === 'reply') {
      Vα.push({ value : (α = f * Tn * g(Δts, G) * h(Δtr, H)) / Tn, time });
    } else {
      Vα.push({ value: (α = f * Tn) / Tn, time });
    }

    assert(α <= 1 && α >= 0, 'α must be in (0, 1): α = ' + α);

    // sum of additive inverse of ranks of participants
    const ΣRbar = nP - ΣR;

    // store last index of alpha
    const iαNew = Vα.length;

    const updateParticipant = participant => {
      const rank = ranks[participant];
      let value = rank.value;

      // update participant rank for this period
      value += α * ((1 - value) / ΣRbar);

      // update index of last update
      CM[participant].lastUpdate = iαNew;

      // push new rank with given time
      rank.value = value;
      rank.time = time;
    }

    // update all participants
    updateParticipant(sender);
    recipientArray.forEach(updateParticipant);

    return this;
  }

  // compute lazily evaluated ranks for non participants
  done() {
    this.correspondents.forEach(::this.catchUp);
    return this;
  }

}
