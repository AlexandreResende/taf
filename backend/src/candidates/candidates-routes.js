
const express = require('express');
const router = express.Router();

const { getCandidates, addCandidate, getCandidate, score } = require('./candidates-controller');

router.get('/candidate/:classNumber/:number', getCandidate);

router.get('/candidates/:classNumber', getCandidates);

router.get('/score/:classNumber', score);

router.post('/candidates', addCandidate);

module.exports = router;