
const express = require('express');
const router = express.Router();

const { addExams } = require('./exams-controller');

router.put('/exams', addExams);

module.exports = router;
