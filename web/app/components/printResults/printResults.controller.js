function printResultsController($scope, api, date, $http) {

  $scope.changeViewDate = function () {
    // console.log(date.formatDate($scope.viewDate));
    $scope.updateTable(date.formatDate($scope.viewDate));
  }

  $scope.updateTable = function (date) {

  }

  $scope.chart = {
    legend: {
      display: true,
      position: 'right'
    }
  }

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [300, 500, 100];

  $scope.exportPDF = function () {
    var docDefinition = {
      content : []
    }

    for(var i = 0 ; i < $scope.rows.length; i++){
      var temp = "row" + i;
      var height = $scope.rows[i].length * 20;
      getTablesCanvas(temp.toString(), height)
    }

    function uploadPDF(){
      if(docDefinition.content.length == $scope.rows.length)
        pdfMake.createPdf(docDefinition).download("resultados.pdf");
    }

    function getTablesCanvas(id,height){
      html2canvas(document.getElementById(id)).then(function(canvas) {
        var data = canvas.toDataURL();
        docDefinition.content.push({image: data,width: 500,height: height})
        uploadPDF();
      });
    }  
    
  }

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

  $http.get('app/components/printResults/test.json').then(function(response){
    splitArray(response.data);
  }, function(error){
    console.log(error)
  }); 
  

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
      id: 'Prova 1',
      key: 'exam1',
      label: 'Altura',
      template: '<p>{{ row.exams[0].exam1 }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'Prova 2',
      key: 'exam2',
      label: 'Flexão',
      template: '<p>{{ row.exams[0].exam1 }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'Prova 5',
      key: 'exam5',
      label: 'Abdominais',
      template: '<p>{{ row.exams[0].exam1 }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'Prova 3',
      key: 'exam3',
      label: '50 Metros',
      template: '<p>{{ row.exams[0].exam1 }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
    },
    {
      id: 'Prova 4',
      key: 'exams',
      label: '12 Minutos',
      template: '<p>{{ row.exams[0].exam1 }}' + "  <span class='badge badge-warning'>{{ row.exams[0].reteste ? 'Reteste' : '' }}</span>" + '</p>'
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
  .module('printResults')
  .controller('printResultsController', printResultsController);