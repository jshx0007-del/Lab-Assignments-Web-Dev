const mongoose = require('mongoose');

// Keeps a running number per collection (used to give products ids 1, 2, 3...)
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});

module.exports = mongoose.model('Counter', counterSchema);
