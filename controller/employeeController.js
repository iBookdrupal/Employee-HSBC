const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');

//* get Employees
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
      res.render('viewEmployee', {
        users: docs,
        Message: "HSBC Employer's List",
      });
  });
});

//* Post Data

router.post('/new', (req, res) => {
  let {fullName, salary, age, state} = req.body;
  let employee = new Employee();

  employee.fullName = fullName;
  employee.salary = salary;
  employee.age = age;
  employee.state = state;

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

//* get Edit
router.get('/employee:_id', (req, res) => {
  Employee.findById({_id: req.params._id}, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.render('editEmployee', {
        title: `Updating ${data.fullName}'s Record`,
        allStaff: data,
      });
    }
  });
});

//* Edit
router.post('/employee:_id', (req, res) => {
  //* express
  let {fullName, salary, age, state} = req.body;
  let employee = {};

  employee.fullName = fullName;
  employee.salary = salary;
  employee.age = age;
  employee.state = state;

  let query = {_id: req.params._id};

  Employee.findOneAndUpdate(query, employee, {useFindAndModify: false}, (err) => {
    //* Mongoose
    if (err) {
      res.send('unable to update ' + err);
    } else {
      console.log(employee.fullName);
      //res.send('Update Successfully');
      res.redirect('/viewEmployee');
      console.log(employee);
    }
  });
});

module.exports = router;
