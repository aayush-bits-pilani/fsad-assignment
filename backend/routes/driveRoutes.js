const express = require('express');
const router = express.Router();
const {
  createDrive,
  getUpcomingDrives,
  editDrive
} = require('../controllers/driveController');

router.post('/', createDrive);
router.get('/upcoming', getUpcomingDrives);
router.put('/:id', editDrive);

module.exports = router;
