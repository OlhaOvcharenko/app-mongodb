const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();


router.get('/employees', (req, res) => {
  req.db.collection('employees')
  .find()
  .toArray()
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.status(500).json({ message: err });
  });
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees')
    .aggregate([{ $sample: { size: 1 } }])
    .toArray()
    .then((data) => {
      res.json(data[0]);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.get('/employees/:id', (req, res) => {
  req.db.collection('employees')
    .findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if(!data) res.status(404).json({ message: 'Not found' });
      else res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.post('/employees', (req, res) => {
  const { name, lastname, department, salary } = req.body;

  req.db.collection('employees')
    .insertMany([{ name: name, lastName: lastname, department: department , salary: salary}])
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
});

router.put('/employees/:id', (req, res) => {
  const { name, lastname, department, salary} = req.body;

  req.db.collection('employees')
    .updateOne({ _id: ObjectId(req.params.id) }, { $set: { name: name }, $set: { lastname: lastname },
    $set: { department: department }, $set: { salary: salary},})
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
});

router.delete('/employees/:id', (req, res) => {
  req.db.collection('employees')
    .deleteOne({ _id: ObjectId(req.params.id) })
    .then(() => {
      res.json({ message: 'OK' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    })
});

module.exports = router;