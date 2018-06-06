
const { gender } = require('./enums');
const getMostRecentTest = require('./getMostRecentTest');
const punctuation = require('../candidates/punctuation.json');

const pushUpsScore = (examName, candidateGender, testArray) => {
  if (testArray.length !== 0) {
    let candidateScore = 0;
    const examObject = getMostRecentTest(testArray);
    const genderSpecific = gender[candidateGender];
    const scoreTable = punctuation[genderSpecific][examName];
    const scoreTableKeys = Object.keys(scoreTable);
    const { result, retest } = examObject;

    if (result < scoreTableKeys[0]) {
      candidateScore = 0;
    } else if (result > scoreTableKeys[scoreTableKeys.length - 1]) {
      candidateScore = 100;
    } else {
      candidateScore = scoreTableKeys[result];
    }

    return {
      result,
      retest,
      candidateScore,
    };
  }
  return {
    result: '-',
    retest: '-',
    candidateScore: '-',
  };
};

module.exports = pushUpsScore;
