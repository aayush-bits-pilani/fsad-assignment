const mongoose = require('mongoose');

const DriveSchema = new mongoose.Schema({
  vaccineName: String,
  date: Date,
  dosesAvailable: Number,
  classes: [String]
});

module.exports = mongoose.model('Drive', DriveSchema);
