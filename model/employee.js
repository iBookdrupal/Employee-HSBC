var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EmpSchema = new Schema({
  fullName: {
    type: String,
    required: false,
  },
  salary: {
    type: Number,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Employee', EmpSchema);
