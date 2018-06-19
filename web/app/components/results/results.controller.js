function resultsController($scope, api, date, $http) {

    //initializing date and getting the score to the actual date
    $scope.formTable = {
      viewDate : new Date()
    }
  
    $scope.changeViewDate = function () {
      getScore(date.formatDate($scope.formTable.viewDate),$scope.formTable.classNumber);
    }
  
    //get the score from APi
    function getScore(date,classNumber){
      api.getScore(date,classNumber).then(function(response){
        var temp = response.data.result.candidatesArrayResponse;
        for(var i = 0 ; i < temp.length ; i ++){
          if(temp[i].punctuation.fiftyMetersRunning.result != "-")
            temp[i].punctuation.fiftyMetersRunning.result = $scope.format(temp[i].punctuation.fiftyMetersRunning.result)
        }
        $scope.rows = temp;
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

  $scope.format = function(val){
    let value = val.toString();
    return value.substr(0,value.length -2) + "." + value.substr(value.length -2, value.length);
  }

  $scope.columns = [
    {
      id: 'number',
      key: 'number',
      sort: 'number',
      label: 'Numero',
      filter: 'like',
      filterPlaceholder: 'Digite um numero',
      width: '100px'
    },
    {
      id: 'name',
      key: 'name',
      sort: 'string',
      label: 'Nome',
      filter: 'like',
      filterPlaceholder: 'Digite um nome',
      template: '<a href=\"#/detail/' + '{{row.examDate}}' + '/' + '{{row.classNumber}}' + '/' + '{{row.number}}\">{{row.name}}</a> '
    },
    {
      id: 'gender',
      key: 'gender',
      label: 'Genero',
      width: '80px',
      template: '{{ row.gender == "Masculino" ? "M" : "F" }}'
    },
    {
      id: 'cpf',
      key: 'cpf',
      label: 'CPF',
      filter: 'like',
      filterPlaceholder: 'Digite um CPF',
      width: '150px',
    },
    {
      id: 'height',
      key: 'height',
      label: 'Altura',
      width: '150px',
      template: " {{ row.punctuation.height.result }} m <span class='badge badge-success'>{{ (row.punctuation.height.candidateScore != '-' && row.punctuation.height.candidateScore == true) ? 'Aprovado' : '' }}</span>" 
      + " <span class='badge badge-danger'>{{ (row.punctuation.height.candidateScore != '-' && row.punctuation.height.candidateScore == false) ? 'Reprovado' : '' }}</span>"  
    },
    {
      id: 'pushups',
      key: 'pushups',
      label: 'Flexão',
      width: '150px',
      template: 'Flexões: {{ row.punctuation.pushups.result }}<p>Pontos: {{ row.punctuation.pushups.candidateScore }}' 
        + '</p>'
    },
    {
      id: 'abdominal',
      key: 'abdominal',
      label: 'Abdominais',
      width: '150px',
      template: 'Abdominais: {{ row.punctuation.abdominal.result }}<p>Pontos: {{ row.punctuation.abdominal.candidateScore }}' 
        + '</p>'
    },
    {
      id: 'fiftyMetersRunning',
      key: 'fiftyMetersRunning',
      label: '50 Metros',
      width: '200px',
      template: 'Tempo: {{ row.punctuation.fiftyMetersRunning.result }}  segundos<p>Pontos: {{ row.punctuation.fiftyMetersRunning.candidateScore }}' 
        + '</p>'
    },
    {
      id: 'twelveMinutesRunning',
      key: 'twelveMinutesRunning',
      label: '12 Minutos',
      width: '150px',
      template: 'Metros: {{ row.punctuation.twelveMinutesRunning.result }}<p>Pontos: {{ row.punctuation.twelveMinutesRunning.candidateScore }}' 
        + '</p>'
    },
    {
      id: 'points',
      key: 'Total',
      label: "Resultado",
      width: '100px',
      template: '<span class="' 
        + "{{ ((row.punctuation.twelveMinutesRunning.candidateScore + row.punctuation.fiftyMetersRunning.candidateScore + row.punctuation.abdominal.candidateScore + row.punctuation.pushups.candidateScore) > 200) && (row.punctuation.height.candidateScore != '-' && row.punctuation.height.candidateScore && row.punctuation.twelveMinutesRunning.candidateScore >= 10 && row.punctuation.fiftyMetersRunning.candidateScore >= 10 && row.punctuation.abdominal.candidateScore >= 10 && row.punctuation.pushups.candidateScore >= 10 ) ? 'green-font' : 'red-font'}}" 
        + '">' 
        + '{{ (row.punctuation.twelveMinutesRunning.candidateScore != "-" && row.punctuation.fiftyMetersRunning.candidateScore != "-" && row.punctuation.abdominal.candidateScore != "-" && row.punctuation.pushups.candidateScore != "-" ) ? row.punctuation.twelveMinutesRunning.candidateScore + row.punctuation.fiftyMetersRunning.candidateScore + row.punctuation.abdominal.candidateScore + row.punctuation.pushups.candidateScore : "" }}</span>' 
        + " <span class='badge badge-success'>{{ (row.punctuation.height.candidateScore != '-' && row.punctuation.twelveMinutesRunning.candidateScore  != '-' && row.punctuation.fiftyMetersRunning.candidateScore  != '-' && row.punctuation.abdominal.candidateScore  != '-' && row.punctuation.pushups.candidateScore != '-' ) && ((row.punctuation.twelveMinutesRunning.candidateScore + row.punctuation.fiftyMetersRunning.candidateScore + row.punctuation.abdominal.candidateScore + row.punctuation.pushups.candidateScore) > 200) && (row.punctuation.height.candidateScore && row.punctuation.twelveMinutesRunning.candidateScore >= 10	&& row.punctuation.fiftyMetersRunning.candidateScore >= 10 && row.punctuation.abdominal.candidateScore >= 10 && row.punctuation.pushups.candidateScore >= 10 ) ? 'Aprovado' : '' }}</span>"
        + " <span class='badge badge-danger'>{{ (row.punctuation.height.candidateScore != '-' && row.punctuation.twelveMinutesRunning.candidateScore  != '-' && row.punctuation.fiftyMetersRunning.candidateScore  != '-' && row.punctuation.abdominal.candidateScore  != '-' && row.punctuation.pushups.candidateScore != '-' )&& ((( row.punctuation.twelveMinutesRunning.candidateScore + row.punctuation.fiftyMetersRunning.candidateScore + row.punctuation.abdominal.candidateScore + row.punctuation.pushups.candidateScore	) <= 200) || (!row.punctuation.height.candidateScore || row.punctuation.twelveMinutesRunning.candidateScore < 10 || row.punctuation.fiftyMetersRunning.candidateScore < 10 || row.punctuation.abdominal.candidateScore < 10 || row.punctuation.pushups.candidateScore < 10 )) ? 'Reprovado' : '' }}</span>"
        + " <span class='badge badge-danger'>{{ (row.punctuation.height.candidateScore == '-' || row.punctuation.twelveMinutesRunning.candidateScore  == '-' || row.punctuation.fiftyMetersRunning.candidateScore  == '-' || row.punctuation.abdominal.candidateScore  == '-' || row.punctuation.pushups.candidateScore == '-' ) ? 'Ausente' : '' }}</span>"
    }
  ];

}

angular
  .module('results')
  .controller('resultsController', resultsController);