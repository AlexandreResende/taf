angular
  .module('taf')
  .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise("/home")

    $stateProvider
      .state('home', {
        url: "/home",
        component: 'home'
      })
      .state('results',{
        url: "/home/results",
        component: "results"
      })
  }
);
