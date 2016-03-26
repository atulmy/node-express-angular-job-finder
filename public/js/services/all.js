// Pubic / JS / Services
var appServices = angular.module('appServices', []);

appServices.factory('JobsService', ['$http', function($http) {
    return {
        list: function() {
            return $http.get('/api/jobs');
        },

        add: function(job) {
            return $http.post('/api/job', job);
        },

        view: function(jobId) {
            return $http.get('/api/job/'+jobId);
        }
    }
}]);

appServices.factory('FilterService', function() {
    return {
        sortBy: 'freshness',
        filterBy: {
            min: 0,
            max: 3999
        }
    }
});