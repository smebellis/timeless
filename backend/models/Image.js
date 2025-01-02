const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: String,
  description: String,
});

module.exports = mongoose.model('Image', ImageSchema);
