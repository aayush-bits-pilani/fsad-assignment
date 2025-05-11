const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  driveDate: { type: Date, required: true },
  availableDoses: Number,
  grades: [String]
});

module.exports = mongoose.model('VaccinationDrive', driveSchema);
