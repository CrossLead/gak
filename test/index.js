import gak from '../src/';
import pkg from '../package.json';
import { expect } from 'chai';



describe('Graph Analysis Kit', () => {

  describe('Simple initial checks', () => {

    it('Should have the correct semantic version', done => {
      expect(gak.version).to.equal(pkg.version);
      done();
    });

  });

  describe('EventRank', () => {

    it('Decay function should return expected values given parameters', done => {

    });

  })

});
