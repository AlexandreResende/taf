angular
  .module('taf')
  .factory('api', function($http){

    function addCandidate(data) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/candidates',
          data: data
      })
    }

    function getCandidates(date) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/candidates/' + date
      })
    }

    return {
      addCandidate: addCandidate,
      getCandidates: getCandidates
    };    

  }
);