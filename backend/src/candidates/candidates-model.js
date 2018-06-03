
const models = require('../models');
const abdominalPushUpsScore = require('../helper/abdominalPushUpsScore');
const runningScore = require('../helper/runningScore');

class Candidates {
  static getCandidate(examDate, number) {
    return new Promise((resolve, reject) => {
      models.Candidates.find({
        where: {
          examDate,
          number,
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  static getCandidates(examDate) {
    return new Promise((resolve, reject) => {
      models.Candidates.findAll({
        where: {
          examDate,
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  static score(examDate) {
    return new Promise((resolve, reject) => {
      const allCandidates = this.getCandidates(examDate);

      Promise
        .all([allCandidates])
        .then((candidates) => {
          for (candidate of candidates) {
            const { gender, exams } = candidate;
            const pushups = exams.filter((exam) => exam.name === 'Flexão');
            const abdominal = exams.filter((exam) => exam.name === 'Abdominal');
            const fiftyMetersRunning = exams.filter((exam) => exam.name === 'Corrida de 50 metros');
            const twelveMinutesRunning = exams.filter((exam) => exam.name === 'Corrida de 12 minutos');

            candidate.punctuation = {
              pushups: abdominalPushUpsScore('flexao', gender, pushups),
              abdominal: abdominalPushUpsScore('abdominal', gender, abdominal),
              fiftyMetersRunning: abdominalPushUpsScore('50m', gender, fiftyMetersRunning),
              twelveMinutesRunning: abdominalPushUpsScore('12min', gender, twelveMinutesRunning),
            };
          }
          
          resolve(candidates);
        })
        .catch(reject);
      });
  }

  static addCandidate(candidate) {
    return new Promise((resolve, reject) => {
      models.Candidates.create(candidate)
        .then(resolve)
        .catch(reject);
    });
  }
}

module.exports = Candidates;
