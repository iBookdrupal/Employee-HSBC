var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var Employee = require('./model/employee');
var database = require('./config/database');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');

var app = express();
//app.use(express.methodOverride());
app.use(bodyParser());
//app.use(app.router);
app.use(expressLayouts);
app.use('/assets', express.static('assets'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//connect to db
mongoose.connect('mongodb://localhost/employeeDB');

const user = mongoose.model('emp', Schema);

app.get('/', (req, res) => {
  res.render('index', {
    message: 'HSBC Staff',
  });
});

//get Employees
app.get('/addEmployee', (req, res) => {
  res.render('addEmployee', {
    title: 'Register New Employee',
  });
});

var port = process.env.port || 8888;

app.listen(port);
console.log('App listening to port: ' + port);
