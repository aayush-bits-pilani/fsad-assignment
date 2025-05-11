const Student = require('../models/student');
const VaccinationDrive = require('../models/VaccinationDrive');
const { Parser } = require('json2csv');

exports.exportReportCSV = async (req, res) => {
  const students = await Student.find().populate('vaccinatedRecords.driveId');

  const data = students.flatMap(s =>
    s.vaccinatedRecords.map(vr => ({
      studentId: s.studentId,
      name: s.name,
      grade: s.grade,
      vaccineName: vr.vaccineName,
      date: vr.date.toISOString().split('T')[0]
    }))
  );

  const parser = new Parser({ fields: ['studentId', 'name', 'grade', 'vaccineName', 'date'] });
  const csv = parser.parse(data);

  res.header('Content-Type', 'text/csv');
  res.attachment('vaccination-report.csv');
  res.send(csv);
};

// Get report with filtering by vaccine
exports.getReport = async (req, res) => {
  const { vaccineName } = req.query;

  const filter = {};
  if (vaccineName) {
    filter['vaccinatedRecords.vaccineName'] = vaccineName;
  }

  const students = await Student.find(filter).populate('vaccinatedRecords.driveId');
  const reportData = students.map(s => ({
    studentId: s.studentId,
    name: s.name,
    grade: s.grade,
    vaccinations: s.vaccinatedRecords.map(v => ({
      vaccineName: v.vaccineName,
      date: v.date.toISOString().split('T')[0],
    }))
  }));

  res.json(reportData);
};
