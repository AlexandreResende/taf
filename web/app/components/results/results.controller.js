function resultsController($scope, api) {

  function formatDate(date){
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;
  }

  $scope.changeViewDate = function() {
    $scope.updateTable(formatDate($scope.viewDate));
  }

  $scope.updateTable = function(date) {

  }
 
  $scope.options = {
    pagingStrategy:"SCROLL",
    bodyHeight: 1000,
    initialSorts: [
      {
        id: 'number',
        dir: '+'
      }
    ]
  }
 
  $scope.rows=[
    {
      "number": 1,
      "name":"Guilherme",
      "gender":"Masculino",
      "cpf":"123.123.123-12",
      "points":400,
      "exam1": 50,
      "exam2":"100",
      "exam3":"100",
      "exam4":"100"
    },
    {
      "number": 2,
      "name":"Guilherme",
      "gender":"Masculino",
      "cpf":"123.123.123-12",
      "points":201,
      "exam1":"100",
      "exam2":"100",
      "exam3":"100",
      "exam4":"100"
    },
    {
      "number": 3,
      "name":"Guilherme",
      "gender":"Masculino",
      "cpf":"123.123.123-12",
      "exam1":"100",
      "exam2":"100",
      "exam3":"100",
      "exam4":"100",
      "points":200
    }
  ]

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
      id: 'Prova 1',
      key: 'exam1'
    },
    {
      id: 'Prova 2',
      key: 'exam2'
    },
    {
      id: 'Prova 3',
      key: 'exam3'
    },
    {
      id: 'Prova 4',
      key: 'exam4'
    },
    {
      id: 'points',
      key: 'points',
      template: '<p class="' + "{{ row.points > 200 ? 'green-font' : 'red-font'}}" + '">' + '{{row.points}}</p>'
    }
  ];

}

angular
  .module('results')
  .controller('resultsController', resultsController);