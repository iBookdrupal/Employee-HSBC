var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EmpSchema = new Schema({
  fullName: {
    type: String,
    required: 'This field is required',
  },
  salary: {
    type: Number,
    required: 'This field is required',
  },
  age: Number,
  state: String,
});

module.exports = mongoose.model('Employee', EmpSchema);
