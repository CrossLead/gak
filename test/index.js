import _ from 'lodash';
import { expect } from 'chai';
import pkg from '../package.json';
import { EventRank, version } from '../src/';
import { assert } from '../src/util/';


const { abs } = Math;
const expectVeryClose = x => y => expect(abs(x - y)).to.be.below(10e-8);


describe('Graph Analysis Kit', () => {


  describe('Simple initial checks', () => {

    it('Should have the correct semantic version', done => {
      expect(version).to.equal(pkg.version);
      done();
    });

  });


  describe('Utility functions', () => {

    it('Assert function should throw on false', done => {
      expect(assert).to.exist;
      expect(() => assert(false, 'throwing false')).to.throw(Error);
      expect(() => assert(true, 'no error')).to.not.throw(Error);
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
        .map(x => x[0].value)
        .value();

      values.forEach(expectVeryClose(1/3));
      const sum = values.reduce((o, v) => o + v, 0);
      expectVeryClose(sum)(1);
      done();
    });


  });

});
