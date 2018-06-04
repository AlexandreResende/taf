
const models = require('../models');

const heightScore = require('../helper/heightScore');
const fiftyMeterScore = require('../helper/fiftyMeterScore');
const twelveMinutesRunnings = require('../helper/twelveMinutesRunning');
const abdominalPushUpsScore = require('../helper/abdominalPushUpsScore');

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
          const candidatesArrayResponse = [];
          for (let candidate of candidates[0]) {
            const candidateInformation = Object.assign({ }, candidate.dataValues);
            const { gender, exams } = candidateInformation;
            const height = exams.filter((exam) => exam.name === 'Altura');
            const pushups = exams.filter((exam) => exam.name === 'Flexão');
            const abdominal = exams.filter((exam) => exam.name === 'Abdominal');
            const fiftyMetersRunning = exams.filter((exam) => exam.name === 'Corrida de 50 metros');
            const twelveMinutesRunning = exams.filter((exam) => exam.name === 'Corrida de 12 minutos');

            candidateInformation.punctuation = {
              height: heightScore('altura', gender, height),
              pushups: abdominalPushUpsScore('flexao', gender, pushups),
              abdominal: abdominalPushUpsScore('abdominal', gender, abdominal),
              fiftyMetersRunning: fiftyMeterScore('50m', gender, fiftyMetersRunning),
              twelveMinutesRunning: twelveMinutesRunnings('12min', gender, twelveMinutesRunning),
            };

            candidatesArrayResponse.push(candidateInformation);
          }
          
          resolve(candidatesArrayResponse);
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
