// Pubic / JS / Controllers / Jobs
var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('JobsController', ['$scope', 'JobsService', function($scope, JobsService) {
    // Search jobs
    $scope.search = {};
    $scope.search.text = '';
    $scope.search.location = 0;

    // Sort jobs
    $scope.sort = {};
    $scope.sort.value = 'freshness';

    // Filter jobs
    $scope.filter = {};
    $scope.filter.min = -1;
    $scope.filter.max = -1;

    // Apply search
    $scope.search.find = function() {
        JobsService.list({sort: $scope.sort.value, text: $scope.search.text, location: $scope.search.location, filter: {min: $scope.filter.min, max: $scope.filter.max}}).success(function(data) {
            $scope.jobs = data;

            Materialize.toast('Results '+$scope.search.text+' and '+$scope.search.location, 2000);
        });
    };

    // Apply sort
    $scope.sort.update = function(sort) {
        $scope.sort.value = sort;
        JobsService.list({sort: $scope.sort.value, text: $scope.search.text, location: $scope.search.location, filter: {min: $scope.filter.min, max: $scope.filter.max}}).success(function(data) {
            $scope.jobs = data;

            Materialize.toast('Results updated by '+$scope.sort.value, 2000);
        });
    };

    // Apply filter
    $scope.filter.update = function(min, max) {
        $scope.filter.min = min;
        $scope.filter.max = max;

        JobsService.list({sort: $scope.sort.value, text: $scope.search.text, location: $scope.search.location, filter: {min: $scope.filter.min, max: $scope.filter.max}}).success(function(data) {
            $scope.jobs = data;

            Materialize.toast('Results updated by salary', 2000);
        });
    };

    // Get jobs
    JobsService.list().success(function(data) {
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