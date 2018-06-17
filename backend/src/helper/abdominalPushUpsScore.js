
const { gender } = require('./enums');
const noTestResponse = require('./noTestResponse');
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
      candidateScore = scoreTable[result];
    }

    return noTestResponse(result, retest, candidateScore);
  }
  return noTestResponse();
};

module.exports = pushUpsScore;
