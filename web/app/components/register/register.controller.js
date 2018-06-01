function registerController($scope, $mdToast, api, focus) {

  // Initializing the radial buttons, so they wont start empty.
  $scope.form = {
    examDate: new Date(),
    candidateSex:""
  }

  $scope.viewDate = new Date();

  function formatDate(date){
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    // console.log((day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year)
    return (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;
  }

  $scope.changeViewDate = function() {
    $scope.updateTable(formatDate($scope.viewDate));
  }

  /*
  *  Function used to clear the form
  *  $setPristine and $setUntouched will prevent ng-messages
  */
  $scope.clearForm = function(){
    $scope.form = {
      examDate: new Date(),
      candidateSex: ""
    }
    $scope.newCandidateForm.$setPristine();
    $scope.newCandidateForm.$setUntouched();
  }

  $scope.updateTable = function(date) {
    api.getCandidates(date).then(function(response){
      $scope.rows = response.data.result;
    }, function(error){
      console.log(error)
    }); 
  }

  /*
  *  On submit form
  */
  $scope.submit = function(){

    // Validating the radio buttons, required or ng-required are not working on these buttons
    if($scope.form.candidateSex == ""){
      $scope.toastMessage('error','Genero não foi selecionado');
      return;
    }

    var data = {
      name: $scope.form.candidateName,
      gender: $scope.form.candidateSex,
      cpf: $scope.form.candidateCPF,
      number: $scope.form.candidateNumber,
      examDate: formatDate($scope.form.examDate),
      exams: []
    }

    api.addCandidate(data).then(function(response){
      $scope.toastMessage('success','Cadastro Realizado com sucesso');
      $scope.clearForm();
      $scope.updateTable(formatDate($scope.viewDate));
      focus('focusMe');
    }, function(error){
      $scope.toastMessage('error','Erro ao cadastrar candidato');
    }); 

    data = {};
  }

  /*
  *   Small Toast Message on bottom right of the screen
  */
  $scope.toastMessage = function(type,message) {
    $mdToast.show(
      $mdToast.simple({
        hideDelay: 5000,
        position: 'top right',
        content: message,
        toastClass: type
      })
    );
  };

  $scope.options = {
    pagingStrategy:"PAGINATE",
    rowsPerPage: 100,
    rowsPerPageMessage: "Linhas por Pagina",
    initialSorts: [
      {
        id: 'number',
        dir: '+'
      }
    ]
  }

  $scope.columns = [
    {
      id: 'number',
      key: 'number',
      filter: 'like',
      sort: 'number',
      label: 'Numero do Candidato',
      filterPlaceholder: 'Digite um numero'
    },
    {
      id: 'name',
      key: 'name',
      sort: 'string',
      filter: 'like',
      label: 'Nome',
      filterPlaceholder: 'Digite um nome'
    },
    {
      id: 'gender',
      key: 'gender',
      label: 'Genero'
    },
    {
      id: 'cpf',
      key: 'cpf',
      filter: 'like',
      label: 'CPF',
      filterPlaceholder: 'Digite um CPF'
    },
    {
      id: 'examDate',
      key: 'examDate',
      label: 'Dia do Exame'
    }
  ];

  $scope.updateTable(formatDate($scope.viewDate));

}

angular
  .module('register')
  .controller('registerController', registerController);