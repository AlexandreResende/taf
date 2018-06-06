
const { gender } = require('./enums');
const getMostRecentTest = require('./getMostRecentTest');
const punctuation = require('../candidates/punctuation.json');

const heightScore = (examName, candidateGender, testArray) => {
  if (testArray.length === 0) {
    let candidateScore = false;
    const examObject = getMostRecentTest(testArray);
    const genderSpecific = gender[candidateGender];
    const minimunHeight = punctuation[genderSpecific][examName];
    const { result, retest } = examObject;
    
    candidateScore = (result < minimunHeight) ? false : true;

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

module.exports = heightScore;
