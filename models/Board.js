const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: false
  },
  writer: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Board = mongoose.model('board', BoardSchema);
