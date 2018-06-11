
const { gender } = require('./enums');
const noTestResponse = require('./noTestResponse');
const getMostRecentTest = require('./getMostRecentTest');
const punctuation = require('../candidates/punctuation.json');

const heightScore = (examName, candidateGender, testArray) => {
  if (testArray.length !== 0) {
    let candidateScore = false;
    const examObject = getMostRecentTest(testArray);
    const genderSpecific = gender[candidateGender];
    const minimunHeight = punctuation[genderSpecific][examName];
    const { result, retest } = examObject;
    
    candidateScore = (result < minimunHeight) ? false : true;

    return noTestResponse(result, retest, candidateScore);
  }
  return noTestResponse();
};

module.exports = heightScore;
