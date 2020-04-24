const express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//const Employee = mongoose.model('Employee');
const Employee = require('../model/employee');
var ObjectID = require('mongodb').ObjectID;

//? get Employees
router.get('/addEmployee', (req, res, next) => {
  res.render('addEmployee', {
    title: 'Register New Employee',
  });
});

//# Fetch data
router.get('/viewEmployee', (req, res, next) => {
  Employee.find({}, (err, docs) => {
    if (err) res.send('Unable to retrieve data from the Database! ' + err);
    else
      res.render('viewData', {
        users: docs,
        Message: "HSBC Employer's List",
      });
  });
});

//* Post Data

router.post('/new', (req, res) => {
  var employee = new Employee();

  employee.fullName = req.body.fullName;
  employee.salary = req.body.salary;
  employee.age = req.body.age;
  employee.state = req.body.state;

  employee.save((err, doc) => {
    if (err) res.send('Error reaching the server! ' + err);
    else res.redirect('/viewEmployee');
  });
});

//? Delete data
router.get('/delete/:_id', (req, res) => {
  Employee.findByIdAndRemove(
    {
      _id: req.params._id,
    },
    function (err, docs) {
      if (err) res.send('Unable to Delete' + err);
      else res.redirect('/viewEmployee');
    }
  );
});

//get Edit
router.get('/:_id/update', (req, res, next) => {
  Employee.findById({_id: req.params._id}, function (err, docs) {
    if (err) res.json(err);
    else {
      res.render('editEmployee', {
        title: `Updating ${docs.fullName}'s Record`,
        userStaff: docs,
      });
      next();
    }
  });
});

router.put('/:_id/update', function (req, res) {
  Employee.update(
    req.params._id,
    {
      $set: req.body,
    },
    function (err, docs) {
      if (err) res.send('unable to update ' + err);
      else {
        res.send('Update Successfully');
      }
    }
  );
});

/*
router.put('/:_id/update', function (req, res) {
  var employee = {
    fullName: req.body.fullName,
    salary: req.body.salary,
    age: req.body.age,
    state: req.body.state,
  };
  employee = {$set: employee};
  Employee.update({_id: req.params._id}, employee)
    .then(() => {
      res.send(employee);
    })
    .catch((err) => {
      console.log(err);
    });
});
*/
/*

Employee.update({id: req.params._id}, employee, function (err, docs) {
    if (err) res.json(err);
    else res.redirect('/viewEmployee');
  });
router.put('/:_id/update', function (req, res) {
  Employee.update(
    req.params._id,
    {
      $set: req.body,
    },
    function (err, docs) {
      if (err) res.send('unable to update ' + err);
      else {
        res.send('Update Successfully');
      }
    }
  );
});
*/
module.exports = router;
