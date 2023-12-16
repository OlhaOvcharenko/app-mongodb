const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.module')

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand).populate('department');
    if (!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('department');
    if(!employee) res.status(404).json({ message: 'Not found' });
    else res.json(employee);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, department, salary } = req.body;

    const newEmployee = new Employee({ firstName, lastName, department, salary });
    await newEmployee.save();


    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department, salary} = req.body;
  try {
    const employee = await Employee.findById(req.params.id);
    if(employee) {
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.department = department;
      employee.salary = salary;
      await employee.save();
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if(employee) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;