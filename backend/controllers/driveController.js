const VaccinationDrive = require('../models/VaccinationDrive');

// Create a new drive
exports.createDrive = async (req, res) => {
  const { vaccineName, driveDate, availableDoses, grades } = req.body;

  const driveDateObj = new Date(driveDate);
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 15);

  if (driveDateObj < minDate) {
    return res.status(400).json({ error: 'Drives must be scheduled at least 15 days in advance' });
  }

  // Check for overlapping drives
  const overlapping = await VaccinationDrive.findOne({ driveDate: driveDateObj });
  if (overlapping) {
    return res.status(400).json({ error: 'Drive already scheduled for this date' });
  }

  const newDrive = new VaccinationDrive({ vaccineName, driveDate: driveDateObj, availableDoses, grades });
  await newDrive.save();

  res.status(201).json(newDrive);
};

// Get upcoming drives
exports.getUpcomingDrives = async (req, res) => {
  const today = new Date();
  const in30Days = new Date();
  in30Days.setDate(today.getDate() + 30);

  const drives = await VaccinationDrive.find({
    driveDate: { $gte: today, $lte: in30Days }
  });

  res.json(drives);
};

// Edit a drive
exports.editDrive = async (req, res) => {
  const { id } = req.params;
  const { driveDate, availableDoses } = req.body;

  const drive = await VaccinationDrive.findById(id);
  if (!drive) return res.status(404).json({ error: 'Drive not found' });

  const now = new Date();
  if (new Date(drive.driveDate) < now) {
    return res.status(400).json({ error: 'Cannot edit a past drive' });
  }

  drive.driveDate = new Date(driveDate);
  drive.availableDoses = availableDoses;
  await drive.save();

  res.json(drive);
};
