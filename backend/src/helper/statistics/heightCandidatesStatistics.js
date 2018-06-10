
const heightCandidatesStatistics = (candidatesArray, gender) => {
  const validCandidates = candidatesArray.filter((candidate) => {
    return Object.keys(candidate.punctuation).indexOf('height') !== -1;
  });
  const total = validCandidates.length;
  const approved = validCandidates
    .filter((candidate) => {return candidate.punctuation.height.candidateScore === true}).length;
  const reproved = total - approved;
  const average = validCandidates.reduce((acc, candidate) => acc + candidate.punctuation.height.result, 0) / (total | 1);

  return {
    approved,
    reproved,
    total,
    average,
  };
};

module.exports = heightCandidatesStatistics;
