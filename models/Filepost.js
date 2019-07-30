const mongoose = require('mongoose');

const FilepostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: false
  },
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  fileName: {
    type: String,
    require: true
  },
  filePath: {
    type: String,
    require: true
  },
  upFilePath: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Filepost = mongoose.model('filepost', FilepostSchema);
