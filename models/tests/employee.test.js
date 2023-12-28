const Employee = require('../employee.module');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employee', () => {

  it('should throw an error if any of arg is missining or there are no arguments at all', async () => {
    const cases = [
      { firstName: 'John', lastName: '', department: 'Marketing', salary: 5000},
      { firstName: '', lastName: 'Doe', department: 'Marketing', salary: 5000},
      { firstName: 'John', lastName: 'Doe', department: '', salary: 5000},
      { firstName: 'John', lastName: 'Doe', department: 'Marketing'},
      {},
    ];
    for(let args of cases) {
      const employee = new Employee(args);
      employee.validateSync(err => {
        expect(err.errors.args).to.exist;
      });
    }
  });

  it('should throw an error if one of these args "firstName", "lastName", department" is not a string and salary is not number', () => {
    const cases = [
      { firstName: 'John', lastName: [], department: 11111, salary: 5000},
      { firstName: '', lastName: '/"***', department: 'Marketing', salary: '5000'},
      { firstName: 'John', lastName: 'Doe', department: '+/#', salary: '5000' },
      { firstName: 'John', lastName: 'Doe', department: 99999},
      {},
    ];
    for(let args of cases) {
      const employee = new Employee(args);
      employee.validateSync(err => {
        expect(err.errors.args).to.exist;
      });
    }
  });


  it('should not throw an error if  arguments are ok', () => {
    const cases = [
      { firstName: 'John', lastName: 'Doe', department: 'Marketing', salary: 5000},
      { firstName: 'Amanda', lastName: 'Doe', department: 'Marketing', salary: 7000},
      { firstName: 'John', lastName: 'Underwood', department: 'Customer Service', salary: 5000},
      { firstName: 'Sylwia', lastName: 'White', department: 'Marketing', salary: 6000},
    ];
    for(let args of cases) {
      const employee = new Employee(args);
      employee.validateSync(err => {
        expect(err).to.not.exist;
      });
    }
  });


  after(() => {
    mongoose.models = {};
  });

});
