const express = require('express');
const router = express.Router();
const { getReport } = require('../controllers/reportController');

const { exportReportCSV } = require('../controllers/reportController');

router.get('/export/csv', exportReportCSV);
router.get('/', getReport);

module.exports = router;
