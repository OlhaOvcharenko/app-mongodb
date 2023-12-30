const Employee = require('../employee.module');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {
    try {
      await mongoose.connect('mongodb://0.0.0.0:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });
  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({firstName: 'John', lastName:'Doe', department: 'Marketing', salary: 5000});
      await testEmpOne.save();
      const testEmpTwo = new Employee({firstName: 'Amanda', lastName:'Doe', department: 'Managment', salary: 7000});
      await testEmpTwo.save();
    });
    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });
    it('should return proper document by various params with findOne method', async () => {

      const employee = await Employee.findOne({ firstName: 'Amanda', lastName: 'Doe', department:'Managment'});
      expect(employee.firstName).to.be.equal('Amanda');
      expect(employee.lastName).to.be.equal('Doe');
      expect(employee.department).to.be.equal('Managment');
    });
    after(async () => {
      await Employee.deleteMany();
    });
  }); 

  
  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({firstName: 'Katarzyna', lastName:'Szaminos', department: 'Finance', salary: 5000});
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testDepOne = new Employee({firstName: 'John', lastName:'Doe', department: 'Marketing', salary: 5000});
      await testDepOne.save();
        
      const testDepTwo = new Employee({firstName: 'Amanda', lastName:'Doe', department: 'Managment', salary: 7000});
      await testDepTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({firstName: 'John', lastName:'Doe', department: 'Marketing', salary: 5000}, { $set: { department: 'Managment', salary: 7000 }});
      const updatedEmployee = await Employee.findOne({firstName: 'John', lastName:'Doe', department: 'Managment', salary: 7000});
      expect(updatedEmployee).to.not.be.null;
    });
    
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ department: 'Marketing' });
      employee.department = 'Management';
      await employee.save();
        
      const updatedEmployee = await Employee.findOne({ department: 'Managment'});
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { lastName: 'Updated!' }});
      const employee = await Employee.find();
      expect(employee[0].lastName).to.be.equal('Updated!');
      expect(employee[1].lastName).to.be.equal('Updated!');
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({firstName: 'John', lastName:'Doe', department: 'Marketing', salary: 5000});
      await testEmpOne.save();
      const testEmpTwo = new Employee({firstName: 'Amanda', lastName:'Doe', department: 'Managment', salary: 7000});
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removedEmployee).to.be.null;
    });
    
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
    
  });


});