function printResultsController($scope, api, date, $http) {

  //initializing date and getting the score to the actual date
  $scope.formTable = { 
    viewDate: new Date() 
  }

  // getScore(date.formatDate($scope.viewDate));

  //------------------------------------- Table -----------------------------------------------
  $scope.changeViewDate = function () {
    getScore(date.formatDate($scope.formTable.viewDate),$scope.formTable.classNumber)
  }

  //get the score from APi
  function getScore(date,classNumber){
    api.getScore(date,classNumber).then(function(response){
      response.data.result.candidatesArrayResponse.length > 0 ? splitArray(response.data.result.candidatesArrayResponse) : clearTable();
      $scope.statistics = response.data.result.statistics;
      buildCharts();
    }, function(error){
      clearTable();
      console.log(error)
    }); 
  }

  //Clear all arrays inside the $scope.rows
  function clearTable(){
    if($scope.rows.length > 0)
      for(var i = 0; i < 16 ; i++){
        $scope.rows[i] = [];
      }
  }

  //Split the response into multiples array of 35 elements
  function splitArray(array){
    var arraySplited = []
    var aux = [];
    for(var i = 0; i < array.length; i ++){
      if(array[i].punctuation.fiftyMetersRunning.result != "-")
        array[i].punctuation.fiftyMetersRunning.result = $scope.format(array[i].punctuation.fiftyMetersRunning.result)
      aux.push(array[i]);
      if( (i + 1) % 30 == 0 ){
        arraySplited.push(aux);
        aux = [];
      }
      if( i + 1 >= array.length && aux.length > 0)
        arraySplited.push(aux)
    }
    $scope.rows = arraySplited;
  }

  //table options
  $scope.options = {
    pagingStrategy: "SCROLL",
    bodyHeight: 30000,
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

  //Column definitions
  $scope.columns =[
    {
      id: 'number',
      key: 'number',
      label: 'Numero',
      sort: 'number',
      width: '100px'
    },
    {
      id: 'name',
      key: 'name',
      label: 'Nome'
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
      template: 'Tempo: {{ row.punctuation.fiftyMetersRunning.result }} segundos<p>Pontos: {{ row.punctuation.fiftyMetersRunning.candidateScore }}' 
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


//------------------------------------- END of Table -----------------------------------------------

//------------------------------------- CHARTs -----------------------------------------------

  $scope.chart = {
    legend: {
      display: true,
      position: 'right'
    }
  }

  function buildCharts(){
    chartGender();
    height();
    abdominal();
    pushUps();
    fiftyMeters();
    twelveMinutes();
  }

  // Men x Women 
  function chartGender(){
    $scope.labelsMenXWomen = [ $scope.statistics.gender.men +  " Homens" , $scope.statistics.gender.women + " Mulheres"];
    $scope.dataMenXWomen = [$scope.statistics.gender.men , $scope.statistics.gender.women];
    $scope.colorsMenXWomen = ['#485cf2','#ce16ff']
  }
  
  function height() {
    $scope.heightColors = ['#0fb012','#b00f0f'];
    $scope.heightLabels = ['Homens', 'Mulheres'];
    $scope.heightSeries = ['Aprovados','Reprovados'];
    $scope.heightOptions = {legend: {display: true}};
    $scope.heightData = [
      [$scope.statistics.heightExam.male.approved, $scope.statistics.heightExam.female.approved],
      [ $scope.statistics.heightExam.male.reproved, $scope.statistics.heightExam.female.reproved]
    ];
  }

  function abdominal() {
    $scope.abdominalColors = ['#0fb012','#b00f0f'];
    $scope.abdominalLabels = ['Homens', 'Mulheres'];
    $scope.abdominalSeries = ['Aprovados','Reprovados'];
    $scope.abdominalOptions = {legend: {display: true}};
    $scope.abdominalData = [
      [$scope.statistics.abdominalExam.male.approved, $scope.statistics.abdominalExam.female.approved],
      [ $scope.statistics.abdominalExam.male.reproved, $scope.statistics.abdominalExam.female.reproved]
    ];
  }

  function pushUps(){
    $scope.pushUpsColors = ['#0fb012','#b00f0f'];
    $scope.pushUpsLabels = ['Homens', 'Mulheres'];
    $scope.pushUpsSeries = ['Aprovados','Reprovados'];
    $scope.pushUpslOptions = {legend: {display: true}};
    $scope.pushUpslData = [
      [$scope.statistics.pushUpsExam.male.approved, $scope.statistics.pushUpsExam.female.approved],
      [ $scope.statistics.pushUpsExam.male.reproved, $scope.statistics.pushUpsExam.female.reproved]
    ];
  }

  function fiftyMeters(){
    $scope.fiftyMetersColors = ['#0fb012','#b00f0f'];
    $scope.fiftyMetersLabels = ['Homens', 'Mulheres'];
    $scope.fiftyMetersSeries = ['Aprovados','Reprovados'];
    $scope.fiftyMetersOptions = {legend: {display: true}};
    $scope.fiftyMetersData = [
      [$scope.statistics.fiftyMetersExam.male.approved, $scope.statistics.fiftyMetersExam.female.approved],
      [ $scope.statistics.fiftyMetersExam.male.reproved, $scope.statistics.fiftyMetersExam.female.reproved]
    ];
  }

  function twelveMinutes(){
    $scope.twelveMinutesColors = ['#0fb012','#b00f0f'];
    $scope.twelveMinutesLabels = ['Homens', 'Mulheres'];
    $scope.twelveMinutesSeries = ['Aprovados','Reprovados'];
    $scope.twelveMinutesOptions = {legend: {display: true}};
    $scope.twelveMinutesData = [
      [$scope.statistics.twelveMinutesRunning.male.approved, $scope.statistics.twelveMinutesRunning.female.approved],
      [ $scope.statistics.twelveMinutesRunning.male.reproved, $scope.statistics.twelveMinutesRunning.female.reproved]
    ];
  }


//------------------------------------- END of CHARTs -----------------------------------------------

//------------------------------------- PDF Export -----------------------------------------------
  $scope.exportPDF = function () {
    var docDefinition = {
      content : []
    }

    // TO DO
    // CHARTS
    html2canvas(document.getElementById('exportthis')).then(function(canvas) {
      var data = canvas.toDataURL();
      docDefinition.content.push({image: data,width: 500})
    });

    for(var i = 0 ; i < $scope.rows.length; i++){
      var temp = "row" + i;
      var height = $scope.rows[i].length * 23;
      getTablesCanvas(temp.toString(), height)
    }

    // get the content from all tables and set the height to each one
    // each row will fill 20px 
    function getTablesCanvas(id,height){
      html2canvas(document.getElementById(id)).then(function(canvas) {
        var data = canvas.toDataURL();
        docDefinition.content.push({image: data,width: 500,height: height})
        uploadPDF();
      });
    }
    
    // create the PDF
    function uploadPDF(){
      var day = $scope.formTable.viewDate.getDate();
      var month = $scope.formTable.viewDate.getMonth() + 1;
      var year = $scope.formTable.viewDate.getFullYear();
      var name = day + "-" + month + "-" + year + "-Turma_" + $scope.formTable.classNumber + ".pdf";
      if(docDefinition.content.length == ($scope.rows.length + 1))
        pdfMake.createPdf(docDefinition).download(name);
    }
    
  }

//------------------------------------- END of pdf EXPORT -----------------------------------------------

  

  //TESTS
  // $http.get('app/components/printResults/test.json').then(function(response){
  //   splitArray(response.data);
  // }, function(error){
  //   console.log(error)
  // }); 

}

angular
  .module('printResults')
  .controller('printResultsController', printResultsController);