
const { gender } = require('./enums');
const noTestResponse = require('./noTestResponse');
const getMostRecentTest = require('./getMostRecentTest');
const punctuation = require('../candidates/punctuation.json');

const fiftyMeterScore = (examName, candidateGender, testArray) => {
  if (testArray.length !== 0) {
    let candidateScore = 0;
    const examObject = getMostRecentTest(testArray);
    const genderSpecific = gender[candidateGender];
    const scoreTable = punctuation[genderSpecific][examName];
    const scoreTableKeys = Object.keys(scoreTable);
    const { result, retest } = examObject;

    for (let counter = 0; counter < scoreTableKeys.length; counter++) {
      if (result <= scoreTableKeys[counter]) {
        candidateScore = scoreTable[scoreTableKeys[counter]];
        break;
      }
    }

    return {
      result,
      retest,
      candidateScore,
    };
  }
  return noTestResponse;
};

module.exports = fiftyMeterScore;
