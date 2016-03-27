// Pubic / JS / App

var app = angular.module('app', ['ngRoute', 'appControllers']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/hire', {
            templateUrl: 'views/jobs.add.html',
            controller: 'JobsAddController'
        })
        .when('/', {
            templateUrl: 'views/jobs.html',
            controller: 'JobsController'
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

app.run(function() {
    console.log('App Started @ '+Date());
});