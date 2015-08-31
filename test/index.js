import { expect } from 'chai';
import pkg from '../package.json';
import { EventRank, version } from '../src/';
import { assert } from '../src/util/';

const { abs } = Math;
const diff = (x, y) => abs(x - y);


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
      expect(diff(EventRank.g(Δts, G), expectedOutput)).to.be.below(10e-8);
      done();
    });


    it('Recieve decay function should return expected values given parameters', done => {
      const Δtr = 5,
            H = 3,
            expectedOutput = 0.3149802;

      expect(EventRank.h).to.exist;
      expect(diff(EventRank.h(Δtr, H), expectedOutput)).to.be.below(10e-8);
      done();
    });


  });

});
