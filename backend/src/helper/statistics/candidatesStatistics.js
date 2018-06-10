
const candidatesStatistics = (candidatesArray, examName) => {
  const approvedScore = 60;
  const validCandidates = candidatesArray.filter((candidate) => {
    return Object.keys(candidate.punctuation).indexOf(examName) !== -1;
  });
  const total = validCandidates.length;
  const approved = validCandidates
    .filter((candidate) => {return candidate.punctuation[examName].candidateScore >= approvedScore}).length;
  const reproved = total - approved;
  const average = validCandidates.reduce((acc, candidate) => acc + parseInt(candidate.punctuation[examName].result), 0) / (total | 1);

  return {
    approved,
    reproved,
    total,
    average,
  };
};

module.exports = candidatesStatistics;
