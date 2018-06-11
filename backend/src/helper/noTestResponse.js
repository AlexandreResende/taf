
const noTestResponse = (result = '-', retest = '-', candidateScore = '-') => {
  return {
    result,
    retest,
    candidateScore,
  }
};

module.exports = noTestResponse;
