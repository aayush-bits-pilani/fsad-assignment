const express = require('express');
const router = express.Router();
const {
  upsertStudent,
  getStudents,
  markVaccinated
} = require('../controllers/studentController');
const { uploadCSV } = require('../controllers/studentController');

router.post('/upload', uploadCSV);

router.post('/', upsertStudent);
router.get('/', getStudents);
router.post('/vaccinate', markVaccinated);

module.exports = router;
