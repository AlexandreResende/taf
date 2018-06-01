function registerController($scope, $mdToast) {

  // Initializing the radial buttons, so they wont start empty.
  $scope.form = {
    examDate: new Date(),
    candidateSex: "men"
  }

  /*
  *  Function used to clear the form
  *  $setPristine and $setUntouched will prevent ng-messages
  */
  $scope.clearForm = function(){
    $scope.form = {
      candidateSex: "men"
    }
    $scope.newCandidateForm.$setPristine();
    $scope.newCandidateForm.$setUntouched();
  }

  /*
  *  On submit form
  */
  $scope.submit = function(){
    console.log($scope.form);
    $scope.successMessage();
    //TODO - implement API

    $scope.clearForm();
  }

  /*
  *   Small Toast Message on bottom right of the screen
  */
  $scope.successMessage = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Candidato foi cadastrado com sucesso!')
        .position('bottom right')
        .hideDelay(5000)
    );
  };
 
}

angular
  .module('register')
  .controller('registerController', registerController);