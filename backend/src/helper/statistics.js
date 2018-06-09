
const groupByGender = require('./statistics/groupByGender');
const candidatesStatistics = require('./statistics/candidatesStatistics');

const statistics = (candidatesArray) => {
  const male = candidatesArray.filter((candidate) => candidate.gender === 'Masculino');
  const female = candidatesArray.filter((candidate) => candidate.gender === 'Feminino');

  return {
    gender: groupByGender(candidatesArray),
    heightExam: {
      male: 1,
      female: 1,
    },
    abdominalExam: {
      male: candidatesStatistics(male, 'abdominal'),
      female: candidatesStatistics(female, 'abdominal'),
    },
    pushUpsExam: {
      male: candidatesStatistics(male, 'pushups'),
      female: candidatesStatistics(female, 'pushups'),
    },
    fiftyMetersExam: {
      male: candidatesStatistics(male, 'fiftyMetersRunning'),
      female: candidatesStatistics(female, 'fiftyMetersRunning'),
    },
    twelveMinutesRunning: {
      male: candidatesStatistics(male, 'twelveMinutesRunning'),
      female: candidatesStatistics(female, 'twelveMinutesRunning'),
    },
  };
};

module.exports = statistics;
