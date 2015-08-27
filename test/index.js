import gak from '../';
import pkg from '../package.json';
import pmongo from 'promised-mongo';
import { expect } from 'chai';

describe('Graph Analysis Kit', () => {

  describe('Simple initial checks', () => {

    it('Should have the correct semantic version', done => {
      expect(gak.version).to.equal(pkg.version);
      done();
    });

  });

});
