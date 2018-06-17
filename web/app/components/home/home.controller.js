function homeController($scope, date) {
 
  var dateObj = new Date();

  $scope.dateStr = date.formatDate(dateObj);

}

angular
  .module('home')
  .controller('homeController', homeController);