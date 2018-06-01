angular
  .module('taf').config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('DD/MM/YYYY');
    };
});