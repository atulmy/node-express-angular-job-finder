// Pubic / JS / Controllers
var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('JobsController', ['$scope', 'JobsService', function($scope, JobsService) {
    JobsService.list().success(function(data) {
        $scope.jobs = data;

        console.log($scope.jobs);
    });
}]);