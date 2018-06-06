function printResultsController($scope, api, date, $http) {

  //initializing date and getting the score to the actual date
  $scope.viewDate = new Date();
  getScore(date.formatDate($scope.viewDate));

  //------------------------------------- Table -----------------------------------------------
  $scope.changeViewDate = function () {
    getScore(date.formatDate($scope.viewDate))
  }

  //get the score from APi
  function getScore(date){
    api.getScore(date).then(function(response){
      response.data.result.length > 0 ? splitArray(response.data.result) : clearTable();
    }, function(error){
      clearTable();
      console.log(error)
    }); 
  }

  //Clear all arrays inside the $scope.rows
  function clearTable(){
    for(var i = 0; i < 16 ; i++){
      $scope.rows[i] = [];
    }
  }

  //Split the response into multiples array of 35 elements
  function splitArray(array){
    var arraySplited = []
    var aux = [];
    for(var i = 0; i < array.length; i ++){
      aux.push(array[i]);
      if( (i + 1) % 35 == 0 ){
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

  //Column definitions
  $scope.columns = [
    {
      id: 'number',
      key: 'number',
      sort: 'number',
      label: 'Numero'
    },
    {
      id: 'name',
      key: 'name',
      sort: 'string',
      label: 'Nome',
    },
    {
      id: 'gender',
      key: 'gender',
      label: 'Genero'
    },
    {
      id: 'cpf',
      key: 'cpf',
      label: 'CPF'
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


//------------------------------------- END of Table -----------------------------------------------

//------------------------------------- CHARTs -----------------------------------------------

  // TODO

  $scope.chart = {
    legend: {
      display: true,
      position: 'right'
    }
  }

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];


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
      var height = $scope.rows[i].length * 20;
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
      if(docDefinition.content.length == ($scope.rows.length + 1))
        pdfMake.createPdf(docDefinition).download("resultados.pdf");
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