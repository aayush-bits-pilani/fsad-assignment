const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, required: true },
  name: String,
  grade: String,
  vaccinatedRecords: [
    {
      driveId: { type: mongoose.Schema.Types.ObjectId, ref: 'VaccinationDrive' },
      date: Date,
      vaccineName: String,
    }
  ]
});

module.exports = mongoose.model('Student', studentSchema);
