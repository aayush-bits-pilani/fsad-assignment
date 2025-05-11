const Student = require('../models/student');
const VaccinationDrive = require('../models/VaccinationDrive');
const csv = require('csv-parser');
const multer = require('multer');
const fs = require('fs');
const { validateStudentCSV } = require('../utils/validators');

const upload = multer({ dest: 'uploads/' });

exports.uploadCSV = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const students = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        if (validateStudentCSV(row)) {
          students.push(row);
        }
      })
      .on('end', async () => {
        const ops = students.map(s => ({
          updateOne: {
            filter: { studentId: s.studentId },
            update: { name: s.name, grade: s.grade },
            upsert: true
          }
        }));

        await Student.bulkWrite(ops);
        fs.unlinkSync(req.file.path); // Cleanup temp file
        res.json({ message: `Imported ${students.length} students.` });
      });
  }
];

// Add or update a student
exports.upsertStudent = async (req, res) => {
  const { studentId, name, grade } = req.body;
  try {
    const student = await Student.findOneAndUpdate(
      { studentId },
      { name, grade },
      { new: true, upsert: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch students with optional query
exports.getStudents = async (req, res) => {
  const { name, grade, vaccinated } = req.query;
  const filter = {};
  if (name) filter.name = new RegExp(name, 'i');
  if (grade) filter.grade = grade;
  if (vaccinated) filter.vaccinatedRecords = { $exists: vaccinated === 'true' };

  const students = await Student.find(filter);
  res.json(students);
};

// Mark student as vaccinated
exports.markVaccinated = async (req, res) => {
  const { studentId, driveId } = req.body;

  const drive = await VaccinationDrive.findById(driveId);
  if (!drive) return res.status(404).json({ error: 'Drive not found' });

  const student = await Student.findOne({ studentId });
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const alreadyVaccinated = student.vaccinatedRecords.some(vr => vr.driveId.equals(driveId));
  if (alreadyVaccinated) {
    return res.status(400).json({ error: 'Student already vaccinated for this drive' });
  }

  student.vaccinatedRecords.push({
    driveId,
    date: new Date(),
    vaccineName: drive.vaccineName
  });

  await student.save();
  res.json(student);
};
