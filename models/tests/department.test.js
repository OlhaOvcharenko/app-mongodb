const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

    it('should throw an error if no "name" arg', async () => {

      const dep = new Department({}); // create new Department, but don't set `name` attr value
      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });

    });

    it('should throw an error if "name" is not a string', () => {

      const cases = [{}, []];

      for(let name of cases) {
        const dep = new Department({ name });
        dep.validateSync(err => {
        expect(err.errors.name).to.exist;
        });

      }

    });

    it('should throw an error if length of "name" is shorter then 5 and longer then 20', () => {

      const cases = ['dep','loremimpusloremimpusloremimpus', 'd'];

      for(let name of cases) {
        const dep = new Department({ name });
        dep.validateSync(err => {
        expect(err.errors.name).to.exist;
       });
      }

    });

    it('should not throw an error if  "name" is ok', () => {

      const cases = ['sales','marketing', 'customer service'];

      for(let name of cases) {
        const dep = new Department({ name });
        dep.validateSync(err => {
        expect(err).to.not.exist;
        });
      }
    });
   
    after(() => {
      mongoose.models = {};
    });

});
