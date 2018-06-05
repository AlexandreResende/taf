function resultsController($scope, api, date, $http) {

    //initializing date and getting the score to the actual date
    $scope.viewDate = new Date();
    var selectedDate = date.formatDate($scope.viewDate);
    var dateArray = selectedDate.split("/")
    getScore(selectedDate);
  
    $scope.changeViewDate = function () {
      selectedDate = date.formatDate($scope.viewDate);
      dateArray = selectedDate.split("/")
      getScore(selectedDate);
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
  // });   dateArray

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
      filterPlaceholder: 'Digite um nome',
      template: '<a ui-sref="' + "detail({ day:'" + dateArray[0] 
        + "', month:'" + dateArray[1] 
        + "', year:'" + dateArray[2]
        + "', number:'{{ row.number }}'" 
        + '})">{{ row.name }}</a>'
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
      template: " <span class='badge badge-success'>{{ row.punctuation.height.candidateScore ? 'Aprovado' : '' }}</span>" + " <span class='badge badge-danger'>{{ !row.punctuation.height.candidateScore ? 'Reprovado' : '' }}</span>" + "<span class='badge badge-warning'>{{ row.punctuation.height.retest ? 'Reteste' : '' }}</span>"
    },
    {
      id: 'pushups',
      key: 'pushups',
      label: 'Flexão',
      template: '<p>{{ row.punctuation.pushups.candidateScore }}' + "  <span class='badge badge-warning'>{{ row.punctuation.pushups.retest ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'abdominal',
      key: 'abdominal',
      label: 'Abdominais',
      template: '<p>{{ row.punctuation.abdominal.candidateScore }}' + "  <span class='badge badge-warning'>{{ row.punctuation.abdominal.retest ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'fiftyMetersRunning',
      key: 'fiftyMetersRunning',
      label: '50 Metros',
      template: '<p>{{ row.punctuation.fiftyMetersRunning.candidateScore }}' + "  <span class='badge badge-warning'>{{ rrow.punctuation.fiftyMetersRunning.retest ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'twelveMinutesRunning',
      key: 'twelveMinutesRunning',
      label: '12 Minutos',
      template: '<p>{{ row.punctuation.twelveMinutesRunning.candidateScore }}' + "  <span class='badge badge-warning'>{{ row.punctuation.twelveMinutesRunning.retest ? 'Reteste' : '' }}</span>" + '</p>'
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