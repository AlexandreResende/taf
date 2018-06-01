
const queryString = require('querystring');

const Candidates = require('./candidates-model');

module.exports.getCandidates = (req, res) => {
  const day = req.params.day;
  const month = req.params.month;
  const year = req.params.year;
  const getCandidatesResult = Candidates.getCandidates(`${day}/${month}/${year}`);

  Promise.all([getCandidatesResult])
    .then((candidates) => {
      res.status(200).send({
        result: candidates,
        error: null,
      });
    })
    .catch((err) => {
      res.status(400).send({
        result: null,
        error: err,
      });
    });
};

module.exports.addCandidate = (req, res) => {
  const addCandidateResult = Candidates.addCandidate(req.body);

  Promise.all([addCandidateResult])
    .then((candidate) => {
      res.status(200).send({
        result: candidate,
        error: null,
      });
    })
    .catch((err) => {
      res.status(400).send({
        result: null,
        error: err,
      });
    });
};
