angular
  .module('taf')
  .factory('api', function($http){

    var backendHost = 'http://localhost:3000';

    function addCandidate(data) {
      return $http({
          method: 'POST',
          url: backendHost + '/candidates',
          data: data
      })
    }

    function getCandidates(date,classNumber) {
      return $http({
          method: 'GET',
          url: backendHost + '/candidates/' + date + '/' + classNumber
      })
    }

    function getCandidateDetail(date,classNumber,number) {
      return $http({
          method: 'GET',
          url: backendHost + '/candidate/' + date + '/' + classNumber + '/' + number
      })
    }

    function getScore(date,classNumber){
      return $http({
        method: 'GET',
        url: backendHost + '/score/' + date + '/' + classNumber
      })
    }

    return {
      addCandidate: addCandidate,
      getCandidates: getCandidates,
      getCandidateDetail: getCandidateDetail,
      getScore: getScore
    };    

  }
);