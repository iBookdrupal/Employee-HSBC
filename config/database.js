const MongoClient = require('mongodb').MongoClient;
const dbName = 'employeeDB';
const url = 'mongodb://localhost:';
const mongoOptions = {useNewUrlParser: true};

const connect = (cb) => {
  MongoClient.connect(url, mongoOptions, (err, client) => {
    if (err) console.log(err);
    else {
      //client.db(dbName);
    }
  });
};

module.exports = {connect};
