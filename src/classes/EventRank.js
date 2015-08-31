// local references for math utils
const { PI: π, tanh, pow } = Math;


/**
 * Decay function for influence on potential of event sent by sender s ∈ P_i
 *  using time since event sent from s
 *
 * @param  {Number} ∆t_s : Change in time since last last event sent by s
 * @param  {Number} G : Decay constant to weight sensitivity of new events
 * @return {Number}
 */
function g(∆t_s, G) {
  return ( tanh((10*∆t_s)/(G*π) - π) + 1 ) / 2;
}


/**
 * Decay function for influence on potential of event sent by sender s ∈ P_i
 *  using time since last event recieved by r ∈ P_i from s
 *
 * @param  {Number} ∆t_r : time since last event recieved by r ∈ P_i from s
 * @param  {Number} H : Decay constant to weight sensitivity of new events
 * @return {Number}
 */
function h(∆t_r, H) {
  return pow(2, (-∆t_r)/ H);
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

  constructor(G, H, ƒ=0.3) {
    Object.assign(this, { G, H, ƒ });
  }

  step( event ) {

    // unpack model weight parameters + ranks + correspondents
    const { G, H, ƒ, ranks, correspondents } = this;

    const nC = correspondents.length;

    // participents
    const { from : sender, to } = event;
    const recipients = new Set(Array.isArray(to) ? to : [to]);
    const isParticipent = c => c === sender || recipients.has(c);
    const nP = recipients.size + 1;

    let Tn, ∑R;

    // first pass for potential totals
    for (let i = 0; i < nC; i++) {

      const c = correspondents[i];
      const rank = ranks[c][ranks[c].length - 1];

      if (isParticipent(c)) {
        ∑R += rank;
      } else {
        Tn += rank;
      }

    }

    // sum of additive inverse of ranks of participents
    let ∑Rbar = nP - ∑R;

    // second pass for rank computation
    for (let i = 0; i < nC; i++) {

      const c = correspondents[i];

      const ranks = rank[c],
            R_old = ranks[ranks.length - 1],
            R_new;

      const α = ƒ * Tn * g(∆t_s, G) * h(∆t_r, H);

      if (isParticipent(c)) {
        R_new = R_old + α * ((1 - R_old) / ∑Rbar)
      } else {
        R_new = R_old * (1 - (α / Tn));
      }

      ranks.push(R_new);

      return ranks;

    };

    return rank;

  }

}
