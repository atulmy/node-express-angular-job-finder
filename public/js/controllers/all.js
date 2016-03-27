// Pubic / JS / Controllers / Jobs
var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('JobsController', ['$scope', 'JobsService', function($scope, JobsService) {
    // Search jobs
    $scope.search = {};
    $scope.search.text = '';
    $scope.search.location = '';
    $scope.search.find = function() {
        JobsService.list({sort: 'freshness', searchText: '', location: -1, filter: {min: -1, max: -1}}).success(function(data) {
            $scope.jobs = data;
        });
    };

    $scope.sort = 'freshness';

    // Get jobs
    JobsService.list({sort: $scope.sort, searchText: $scope.search.text, location: $scope.search.location}).success(function(data) {
        $scope.jobs = data;
    });
}]);

appControllers.controller('JobsAddController', ['$scope', 'JobsService', function($scope, JobsService) {
    $scope.job = {};

    $scope.job.data = {};
    $scope.job.data.title = '';
    $scope.job.data.description = '';
    $scope.job.data.location = 0;
    $scope.job.data.salary = '';

    $scope.job.add = function() {
        $scope.job.data.location = parseInt($scope.job.data.location);
        JobsService.add($scope.job.data).success(function(response) {
            console.log(response);
        });
    };
}]);