function candidateDetailController($scope, $stateParams) {
 
    $scope.day = $stateParams.day;
    $scope.month = $stateParams.month;
    $scope.year = $stateParams.year;
    $scope.number = $stateParams.number;

    console.log($scope.day + " " + $scope.month + " " + $scope.year + " " + $scope.number)

}

angular
  .module('candidate-detail')
  .controller('candidateDetailController', candidateDetailController);