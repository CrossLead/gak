/**
 * EventRank implementation
 *
 * Model adapted from "EventRank: A Framework for Ranking Time-Varying Networks"
 * (O’Madadhain & Smyth, 2005), utilizes 'Reply Model' of potential weights
 *
 * PDF: http://www.datalab.uci.edu/papers/linkkdd05-02.pdf
 */


/* TODO:

  Enhancements
    - allow progressive adding of events
*/
import { assert, ensureArray } from '../util/';



const { PI: π, tanh, pow } = Math;
const oneDay = 24*60*60*1000;
const modelTypes = new Set(['baseline', 'reply']);



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
   * Create set of unique correspondents involved in all events
   *
   * @static
   * @return {Array<String>} array of correspondent ids
   */
  static getCorrespondents(data) {
    const outSet = new Set();
    data.forEach(event => {
      outSet.add(event.from);
      ensureArray(event.to).forEach(::outSet.add)
    });
    return Array.from(outSet);
  }


  /**
   * Compute starting ranks of given correspondents
   *
   * @static
   * @return {Array<Object>} starting ranks = 1 / |C|
   */
  static startRanks(correspondents) {
    const value = 1 / correspondents.length,
          time = 0;
    return correspondents.reduce((o, c) => (o[c] = { value, time }, o), {});
  }



  /**
   * Collapse times into buckets
   *
   * @static
   * @param {Array<Object>} Array of events to bucket
   * @return {Array<Object>} Array of objects with properties "events" and "time"
   */
   static bucket(events) {
     const hash = {};
     let bucket;
     events.forEach(event => {
       if (bucket = hash[event.time]) {
         bucket.push(event);
       } else {
         hash[event.time] = [event];
       }
     });
     const times = Object.keys(hash);
     times.sort();
     return times.map(time => ({time, events: hash[time]}))
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


    assert(modelTypes.has(model), 'Unexpected model type: ' + model);

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
   * Json string of serialized EventRank
   *
   * @param {Boolean} pretty print formatted Json
   * @return {String} JSON representation of EventRank
   */
  toJson(pretty) {
    const args = [this.serialize()];
    if (pretty) {
      args.push(...[null, 2])
    }
    return JSON.stringify(...args);
  }


  /**
   * Log current ranks to console
   *
   * @return {EventRank} this : return self for chaining
   */
  log() {
    console.log(this.ranks);
    return this;
  }



  /**
   * Reset model to starting ranks
   *
   * @return {EventRank} this : return self for chaining
   */
  reset() {
    this.ranks = EventRank.startRanks(this.correspondents);
    return this;
  }


  /**
   * Reset model to starting ranks and compute ranks over all events
   *
   * @return {EventRank} this : return self for chaining
   */
  compute() {
    this.reset().events.map(::this.step);
    return this;
  }



  /**
   * Get ranks of top n individuals
   *
   * @param {Number} number of ranks to report (from top)
   * @return {Array<Object>} top n ranks
   */
  top(n) {
    const ranks = [];
    for (const id in this.ranks) {
      ranks.push({id, ...this.ranks[id]});
    }
    ranks.sort((a, b) => b.value - a.value);
    return ranks.slice(0, n);
  }



  /**
   * Get ranks of given ids at current period
   *
   * @param {Array<String> | String} combination of str and array<str> of ids
   * @return {Array<Object>} ranks of (ids) at current period
   */
  get(...ids) {
    // flatten ids
    ids = [].concat(...ids)
    // catchup these individuals
    ids.forEach(::this.catchUp);
    return ids.map(id => ({id, ...this.ranks[id]}));
  }



  /**
   * Ranks of individuals who were not participants in the previous event
   * need to be updated, apply a non-participant rank adjustment
   * for each period:
   *      d ∉ P_i :    R_i(d) = R_i-1(d) * (1 - (α_i / Tn_i))
   *
   * @param  {String} id of participant to "catch up"
   * @return {EventRank} this : return self for chaining
   */
  catchUp(participant) {
    const { correspondanceMatrix: CM, ranks, Vα } = this;
    const iα = Vα.length,
          rank = ranks[participant];

    let i = CM[participant].lastUpdate || 0;

    while(i < iα) {
      const αLag = Vα[i++];
      rank.value *= (1 - αLag.value);
      rank.time = αLag.time;
    }

    // update index of last update
    CM[participant].lastUpdate = iα;
    return this;
  }



  /**
   * "Catch up" all correspondents to current period
   *
   * @return {EventRank} this : return self for chaining
   */
  done() {
    this.correspondents.forEach(::this.catchUp);
    return this;
  }



  /**
   * Calculate new ranks given an additional event
   *
   * @param  {Object | Array<Object>} event to add
   * @param  {String} (optional) bucketMode option (capture | apply)
   * @return {EventRank} return self for chaining
   */
  step(event, bucket) {

    if (event.events) {
      const n = event.events.length - 1;
      event.events.forEach((e, index) => {
        this.step(e, index !== n);
      });
      return this;
    }

    // check if bucket parameter is exactly true
    const capture = bucket === 'capture';
    const apply = bucket === 'apply';
    const isBucket = capture || apply;

    // unpack model weight parameters + ranks + correspondents
    const {
      G, H, f,
      ranks,
      correspondanceMatrix : CM,
      model,
      Vα
    } = this;

    let timeUpdates;
    if (isBucket) {
      timeUpdates = this.timeUpdates = this.timeUpdates || {recieved: {}};
    } else {
      delete this.timeUpdates;
    }


    // unpack event, create set of participants
    const { to, from : sender, time } = event;
    const recipients = new Set(ensureArray(to));

    // if the sender sends themself an email...
    recipients.delete(sender);

    // get array from recipient set
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
      // default to infinite time if no recorded emails sent by sender
      const lagSender = CM[sender];
      Δts = time - (lagSender.sent || -Infinity);

      // record current time as most recent send event by sender
      if (isBucket) {
        timeUpdates[sender].sent = time;
      } else {
        lagSender.sent = time;
      }

      // Find the most recent time a message was recieved by the sender
      // from any of P_i, start at infinity (if no messages
      // recieved by sender from any of P_i)
      let trMin = -Infinity,
          trRecipient;

      recipientArray.forEach(recipient => {
        const tr = lagSender.recieved = lagSender.recieved || {};

        if ((trRecipient = tr[recipient]) && trRecipient > trMin) {
          trMin = trRecipient;
        }

        // if processing bucket, don't apply time updates
        // until all events in bucket have been processed
        if (isBucket) {
          timeUpdates[sender].recieved[recipient] = time;
        } else {
          tr[recipient] = time;
        }

      });

      // time difference (recipient) is
      // between now and minimum determined time above
      Δtr = time - trMin;

      // assert that time differentials are not negative
      // (can't send/recieve messages in the future!)
      assert(Δts >= 0, 'Δts must not be negative: Δts = ' + Δts, event);
      assert(Δtr >= 0, 'Δtr must not be negative: Δtr = ' + Δtr, event);
    }

    // time of last rank compuation of sender
    const lastTimeSender = ranks[sender].time;

    // start sum with sender rank
    let ΣR = ranks[sender].value;

    // build up sum of all participant ranks
    recipientArray.forEach(recipient => {
      ΣR += ranks[recipient].value;
      // safety check to ensure that all of P_i is on same time period
      assert(
        ranks[recipient].time === lastTimeSender,
        'Last event time should be equal for all participants',
        event
      );
    });

    // Safety check to ensure that the sum should be within (0, 1)
    assert(ΣR <= 1 && ΣR >= 0, 'ΣR must be in (0, 1): ΣR = ' + ΣR, event);

    // current total of non participants is one minus participent potential
    const Tn = 1 - ΣR;

    // potential transfer weight
    let α;
    if (model === 'reply') {
      // reply model includes time weighting functions
      Vα.push({
        value : (
          α = f * Tn * g(Δts, G) * h(Δtr, H) // calculate α for below
        ) / Tn, // save α / Tn for non-participants
        time // save time of α calculation
      });
    } else {
      Vα.push({ value: (α = f * Tn) / Tn, time });
    }

    // safety check for bounds of α
    assert(α <= 1 && α >= 0, 'α must be in (0, 1): α = ' + α, event);

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

    // apply time updates for bucket of events
    if (apply) {
      for (const id in timeUpdates) {
        const up = timeUpdates[id];
        const cmS = CM[id];
        cmS.sent = up.sent;
        for (const rid in up.recieved) {
          cmS.recieved[rid] = up.recieved[rid];
        }
      }
      delete this.timeUpdates;
    }

    return this;
  }



}
