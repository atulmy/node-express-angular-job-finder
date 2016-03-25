// Pubic / JS / Controllers
var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('JobsController', ['$scope', 'JobsService', function($scope, JobsService) {
    JobsService.list().success(function(data) {
        $scope.jobs = data;
    });
}]);

appControllers.controller('JobsAddController', ['$scope', 'JobsService', function($scope, JobsService) {
    $scope.job = {};

    $scope.job.data = {};
    $scope.job.data.title = '';
    $scope.job.data.description = '';
    $scope.job.data.location = '';

    $scope.job.add = function() {
        JobsService.add($scope.job.data).success(function(response) {
            console.log(response);
        });
    }
}]);