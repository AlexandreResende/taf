function resultsController($scope, api, date) {

  $scope.changeViewDate = function() {
    // console.log(date.formatDate($scope.viewDate));
    $scope.updateTable(date.formatDate($scope.viewDate));
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
      "exams": [{
        "exam1":10,
        "reteste":true
      }],
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
      "exams": [{
        "exam1":20,
        "reteste":false
      }],
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
      "exams": [{
        "exam1":30,
        "reteste":false
      }],
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
      key: 'exams',
      template: '<p>{{ row.exams[0].exam1 }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'points',
      key: 'points',
      template: '<span class="' + "{{ row.points > 200 ? 'green-font' : 'red-font'}}" + '">' + '{{row.points}}</span>' + " <span class='badge badge-success'>{{ row.points > 200 ? 'Aprovado' : '' }}</span>" + " <span class='badge badge-danger'>{{ row.points  <= 200 ? 'Reprovado' : '' }}</span>"
    }
  ];

}

angular
  .module('results')
  .controller('resultsController', resultsController);