
const models = require('../models');
const generateStatistics = require('../helper/statistics');

const heightScore = require('../helper/heightScore');
const fiftyMeterScore = require('../helper/fiftyMeterScore');
const twelveMinutesRunnings = require('../helper/twelveMinutesRunning');
const abdominalPushUpsScore = require('../helper/abdominalPushUpsScore');

class Candidates {
  static getCandidate(examDate, classNumber, number) {
    return new Promise((resolve, reject) => {
      models.Candidates.find({
        where: {
          examDate,
          classNumber,
          number,
        }
      })
        .then((candidate) => {
          const { id, name, cpf, number, gender, examDate, exams, classNumber } = candidate.dataValues;
          const candidateInformation = Object.assign({ }, { id, name, cpf, number, gender, examDate, exams, classNumber });
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

          resolve(candidateInformation);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  static getCandidates(examDate, classNumber) {
    return new Promise((resolve, reject) => {
      models.Candidates.findAll({
        where: {
          examDate,
          classNumber,
        }
      })
        .then(resolve)
        .catch(reject);
    });
  }

  static score(examDate, classNumber) {
    return new Promise((resolve, reject) => {
      const allCandidates = this.getCandidates(examDate, classNumber);

      Promise
        .all([allCandidates])
        .then((candidates) => {
          const candidatesArrayResponse = [];
          for (let candidate of candidates[0]) {
            const { id, name, cpf, number, gender, examDate, classNumber } = candidate.dataValues;
            const candidateInformation = Object.assign({ }, { id, name, cpf, number, gender, examDate, classNumber });
            const { exams } = candidate.dataValues;
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

          const statistics = generateStatistics(candidatesArrayResponse);

          resolve({ candidatesArrayResponse, statistics });
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
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
