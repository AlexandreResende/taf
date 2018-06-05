
const { gender } = require('./enums');
const getMostRecentTest = require('./getMostRecentTest');
const punctuation = require('../candidates/punctuation.json');

const fiftyMeterScore = (examName, candidateGender, testArray) => {
  let candidateScore = 0;
  const examObject = getMostRecentTest(testArray);
  const genderSpecific = gender[candidateGender];
  const scoreTable = punctuation[genderSpecific][examName];
  const scoreTableKeys = Object.keys(scoreTable);
  const { result, retest } = examObject;

  for (let counter = scoreTableKeys.length - 1; counter >= 0; counter--) {
    if (result <= scoreTable[counter]) {
      candidateScore = scoreTable[scoreTable[counter]];
    }
  }

  return {
    result,
    retest,
    candidateScore,
  };
};

module.exports = fiftyMeterScore;
