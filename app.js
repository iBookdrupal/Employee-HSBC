const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const employeeController = require('./controller/employeeController');

const app = express();

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(bodyParser());
app.use(express.urlencoded({extended: false}));
//app.use(express.methodOverride());
app.use(expressLayouts);
app.use('/assets', express.static('assets'));

const url = 'mongodb://localhost/employeeDB';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

//using controller, 1st parameter folder to display, second instance of the controller
app.use('/', employeeController);

//* Load Index Page
app.get('/', (req, res) => {
  res.render('index', {
    message: 'HSBC Staff',
  });
});

/*
var Schema = new mongoose.Schema({
  fullName: String,
  salary: Number,
  age: Number,
  state: String,
});

var user = mongoose.model('emp', Schema);
*/

//POST
/*
app.post('/new', (req, res) => {
  new user({
    fullName: req.body.fullName,
    salary: req.body.salary,
    age: req.body.age,
    state: req.body.state,
  }).save((err, doc) => {
    if (err) res.send(err);
    else res.redirect('/viewEmployee');
  });
});

*/

/*

//get Data
app.get('/viewEmployee', (req, res) => {
  user.find({}, (err, docs) => {
    if (err) res.json(err);
    else
      res.render('viewData', {
        users: docs,
      });
  });
});
*/

let port = process.env.port || 3000;

app.listen(port);
console.log(`Server running on port: ${port}`);

module.exports = app;
