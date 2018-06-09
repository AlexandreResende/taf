angular
  .module('taf')
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $locationProvider.hashPrefix('');

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        component: 'home'
      })
      .state('results',{
        url: "/results",
        component: "results"
      })
      .state('register',{
        url: "/register",
        component: "register"
      })
      .state('printResults',{
        url: "/printResults",
        component: "printResults"
      })
      .state('detail',{
        url: "/detail/:day/:month/:year/:number",
        component: 'detail'
      })
  }
);
