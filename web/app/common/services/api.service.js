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

    function getCandidates(date) {
      return $http({
          method: 'GET',
          url: backendHost + '/candidates/' + date
      })
    }

    function getCandidateDetail(date,number) {
      return $http({
          method: 'GET',
          url: backendHost + '/candidate/' + date + '/' + number
      })
    }

    function getScore(date){
      return $http({
        method: 'GET',
        url: backendHost + '/score/' + date
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