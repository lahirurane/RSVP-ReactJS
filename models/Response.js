const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ResponseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  isAccepted: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Response = mongoose.model('responses', ResponseSchema);
