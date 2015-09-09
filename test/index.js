import _ from 'lodash';
import { expect } from 'chai';
import pkg from '../package.json';
import { EventRank, version } from '../src/';
import util from '../src/util/';

const { abs } = Math;
const expectVeryClose = (x, message) => {
  return y => expect(abs(x - y), message).to.be.below(10e-8)
};
const sum = (args) => args.reduce(((a, b) => a + b), 0);

// helper functions / variables for making test data
const a = 'a',
      b = 'b',
      c = 'c',
      d = 'd',
      e = 'e',
      event = (from, to, time) => ({to, from, time});

const makeTestEvents = () => [
  event(b, c, 1),
  event(b, c, 2),
  event(b, c, 3),
  event(b, c, 4),
  event(d, b, 5),
  event(e, b, 6),
  event(b, a, 7),
  event(d, b, 8),
  event(e, b, 9),
  event(b, a, 10),
  event(d, b, 11),
  event(e, b, 12),
  event(b, a, 13),
  event(d, b, 14),
  event(e, b, 15),
  event(b, a, 16)
];


describe('Graph Analysis Kit', () => {


  describe('Simple initial checks', () => {

    it('Should have the correct semantic version', done => {
      expect(version).to.equal(pkg.version);
      done();
    });

  });


  describe('Utility functions', () => {

    it('Assert function should throw on false', done => {
      expect(util.assert).to.exist;
      expect(() => util.assert(false, 'throwing false')).to.throw(Error);
      expect(() => util.assert(true, 'no error')).to.not.throw(Error);
      done();
    });

    it('last function should produce last element of array', done => {
      expect(util.last).to.exist;
      expect(util.last([1,2,3]), 'should select util.last element').to.equal(3);
      expect(util.last([]), 'should produce undefined for empty array').to.equal(undefined);
      done();
    });

    it('gakError should throw error', done => {
      expect(() => util.gakError('test')).to.throw(Error);
      done();
    });

    it('ensureArray should wrap object with array if necessary', done => {
      expect(util.ensureArray(1), 'should wrap with array').to.be.an.instanceof(Array);
      expect(util.ensureArray([1]), 'passing array should succeed').to.be.an.instanceof(Array);
      expect(util.ensureArray([1])[0], 'should not wrap if already array').to.equal(1);
      done();
    })

    it('each function should properly operate on arrays', done => {
      let str = '';
      util.each(['a', 'b', 'c'], l => str += l);
      expect(str).to.equal('abc');
      expect(() => util.each({})).to.throw(Error);
      done();
    });

  });


  describe('EventRank', () => {


    it('Send decay function should return expected values given parameters', done => {
      const Δts = 5,
            G = 5,
            expectedOutput = 0.5207411;

      expect(EventRank.g).to.exist;
      expectVeryClose(EventRank.g(Δts, G))(expectedOutput);
      done();
    });


    it('Recieve decay function should return expected values given parameters', done => {
      const Δtr = 5,
            H = 3,
            expectedOutput = 0.3149802;

      expect(EventRank.h).to.exist;
      expectVeryClose(EventRank.h(Δtr, H))(expectedOutput);
      done();
    });

    it('Serializing event rank should produce pojo that can be loaded back into EventRank', done => {
      const correspondents = ['a', 'b', 'c'];
      const e = new EventRank({ correspondents });
      const pojo = e.serialize();
      const json = JSON.stringify(pojo);
      const alt = new EventRank(JSON.parse(json));
      const altJson = JSON.stringify(alt.serialize());
      expect(json).to.equal(e.toJson());
      expect(altJson).to.equal(json);
      done();
    });


    it('Starting with no ranks, and not iterating, should produce ranks = |C|', done => {
      const correspondents = ['a', 'b', 'c'];
      const e = new EventRank({ correspondents });
      const { ranks } = e.serialize();

      expect(ranks).to.exist;

      const values = _(ranks)
        .values()
        .pluck('value')
        .value();

      values.forEach(expectVeryClose(1/3));
      expectVeryClose(sum(values), 'values should sum to one')(1);
      done();
    });


    it('Calculates expected ranks for test data', done => {

      const G = 1; // recharge time
      const H = 0.3; // message half life
      const f = 0.02;
      const model = 'baseline';
      const events = makeTestEvents();
      const correspondents = EventRank.getCorrespondents(events);
      const getRankValues = er => _(er.ranks)
        .values()
        .pluck('value')
        .value();

      // initialize EventRank Object
      const R = new EventRank({ G, H, f, correspondents, model });

      // starting ranks should automatically be calculated for t=0
      const startRanks = getRankValues(R);
      const [first, ...rest] = startRanks;
      expectVeryClose(sum(startRanks), 'start ranks should sum to one')(1);
      rest.forEach(value => expect(value, 'start ranks should all be equal')
        .to.equal(first));

      // test one iteration of events
      const firstEvent = events.shift();
      expect(firstEvent.from).to.equal(b);
      expect(firstEvent.to).to.equal(c);
      R.step(firstEvent);
      R.done();
      const stepOneRanks = getRankValues(R);

      expectVeryClose(
        sum(stepOneRanks),
        'After one iteration, ranks should still sum to one'
      )(1);

      const lastRanks = [a, b, c, d, e]
        .reduce((o, x) => (o[x] = R.ranks[x], o), {});

      const { value : bValue } = lastRanks.b;
      const { value : cValue } = lastRanks.c;

      expect(bValue, 'd ∈ P_i should have same rank on first round')
        .to.equal(cValue);

      [a, d, e].forEach(x => {
        const { value } = lastRanks[x];
        expect(value, 'R(d ∉ P_i) should be lower than R(d ∈ P_i)')
          .to.be.below(bValue);
      });

      events.map(::R.step);
      R.done();

      expect(R.ranks.a.value, 'R(a) > R(c)')
        .to.be.above(R.ranks.c.value);

      done();
    });

  });

});
