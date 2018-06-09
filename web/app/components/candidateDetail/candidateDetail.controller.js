function candidateDetailController($scope, $stateParams, api) {

  var day = $stateParams.day;
  var month = $stateParams.month;
  var year = $stateParams.year;
  var number = $stateParams.number;

  function splitArray(array) {
    var arraySplited = []
    var aux = [];
    for (var i = 0; i < array.length; i++) {
      aux.push(array[i]);
      if ((i + 1) % 6 == 0) {
        arraySplited.push(aux);
        aux = [];
      }
      if (i + 1 >= array.length && aux.length > 0)
        arraySplited.push(aux)
    }
    return arraySplited;
  }

  api.getCandidateDetail((day + '/' + month + '/' + year), number).then(function (response) {
    $scope.candidate = response.data.result;
    $scope.exams = splitArray($scope.candidate.exams);
    console.log($scope.exams)
  }, function (error) {
    console.log(error)
  });

  // PDF
  $scope.exportPDF = function () {
    var docDefinition = {
      content: [],
      pageSize: 'A4'
    }

    html2canvas(document.getElementById('page1')).then(function (canvas) {
      var data = canvas.toDataURL();
      docDefinition.content.push({ image: data, width: 500, height: 700 })

      // page2
      if ($scope.exams.length > 1) {
        html2canvas(document.getElementById('page2')).then(function (canvas) {
          var data = canvas.toDataURL();
          docDefinition.content.push({ image: data, width: 500})
          uploadPDF();
        });
      } else {
        uploadPDF()
      }

    });

    // create the PDF
    function uploadPDF() {
      pdfMake.createPdf(docDefinition).download("resultados.pdf");
    }

  }

}

angular
  .module('candidate-detail')
  .controller('candidateDetailController', candidateDetailController);