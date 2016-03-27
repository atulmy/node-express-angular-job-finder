// Pubic / JS / Services
var appServices = angular.module('appServices', []);

appServices.factory('JobsService', ['$http', function($http) {
    return {
        list: function(params) {
            params = params || {};
            return $http.get('/api/jobs', {params: params});
        },

        add: function(job) {
            return $http.post('/api/job', job);
        },

        view: function(jobId) {
            return $http.get('/api/job/'+jobId);
        }
    }
}]);

appServices.factory('CitiesService', function() {
    return {
        list: function() {
            return [
                {id: 1, name: 'Bangalore'},
                {id: 2, name: 'Mumbai'}
            ];
        }
    }
});