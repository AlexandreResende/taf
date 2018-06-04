function resultsController($scope, api, date, $http) {

    //initializing date and getting the score to the actual date
    $scope.viewDate = new Date();
    getScore(date.formatDate($scope.viewDate));

    $scope.changeViewDate = function () {
      getScore(date.formatDate($scope.viewDate))
    }
  
    //get the score from APi
    function getScore(date){
      api.getScore(date).then(function(response){
        $scope.rows = response.data.result;
      }, function(error){
        $scope.rows = [];
        console.log(error)
      }); 
    }

  $scope.options = {
    pagingStrategy:"PAGINATE",
    rowsPerPage: 25,
    rowsPerPageMessage: "Linhas por Pagina",
    initialSorts: [
      {
        id: 'number',
        dir: '+'
      }
    ]
  }

  //Tests
  // $http.get('app/components/printResults/test.json').then(function(response){
  //   $scope.rows = response.data;
  // }, function(error){
  //   console.log(error)
  // }); 

  $scope.columns = [
    {
      id: 'number',
      key: 'number',
      sort: 'number',
      label: 'Numero',
      filter: 'like',
      filterPlaceholder: 'Digite um numero'
    },
    {
      id: 'name',
      key: 'name',
      sort: 'string',
      label: 'Nome',
      filter: 'like',
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
      label: 'CPF',
      filter: 'like',
      filterPlaceholder: 'Digite um CPF'
    },
    {
      id: 'height',
      key: 'height',
      label: 'Altura',
      template: '<span class="' + "{{ row.punctuation.height ? 'green-font' : 'red-font'}}" + '">' + '{{row.points}}</span>' + " <span class='badge badge-success'>{{ row.punctuation.height ? 'Aprovado' : '' }}</span>" + " <span class='badge badge-danger'>{{ row.points  <= 200 ? 'Reprovado' : '' }}</span>"
    },
    {
      id: 'pushups',
      key: 'pushups',
      label: 'Flexão',
      template: '<p>{{ row.punctuation.pushups }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'abdominal',
      key: 'abdominal',
      label: 'Abdominais',
      template: '<p>{{ row.punctuation.abdominal }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'fiftyMetersRunning',
      key: 'fiftyMetersRunning',
      label: '50 Metros',
      template: '<p>{{ row.punctuation.fiftyMetersRunning }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'twelveMinutesRunning',
      key: 'twelveMinutesRunning',
      label: '12 Minutos',
      template: '<p>{{ row.punctuation.twelveMinutesRunning }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'points',
      key: 'Total',
      label: "Resultado",
      template: '<span class="' + "{{ row.points > 200 ? 'green-font' : 'red-font'}}" + '">' + '{{row.points}}</span>' + " <span class='badge badge-success'>{{ row.points > 200 ? 'Aprovado' : '' }}</span>" + " <span class='badge badge-danger'>{{ row.points  <= 200 ? 'Reprovado' : '' }}</span>"
    }
  ];

}

angular
  .module('results')
  .controller('resultsController', resultsController);