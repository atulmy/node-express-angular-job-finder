// Pubic / JS / Controllers / Jobs
var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('JobsController', ['$scope', 'JobsService', function($scope, JobsService) {
    JobsService.list().success(function(data) {
        $scope.jobs = data;
        console.log($scope.jobs);
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
        JobsService.add($scope.job.data).success(function(response) {
            console.log(response);
        });
    }
}]);


appControllers.controller('SidebarController', ['$scope', function($scope) {

}]);