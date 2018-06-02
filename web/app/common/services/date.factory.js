angular
  .module('taf')
  .factory('date', function(){

    function formatDate(date){
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      return (day < 10 ? "0" + day : day) + "/" + (month < 10 ? "0" + month : month) + "/" + year;
    }

    return {
      formatDate: formatDate
    };    

  }
);