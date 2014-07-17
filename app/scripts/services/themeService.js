angular.module('dandelionAdminApp')
        .factory('themeService', function($http) {
    return {
        findAll: function() {
            return $http.post(options.api.base_url + 'theme');
        },
        findByPk: function(action, data) {
            return $http.post(options.api.base_url + action, data);
        },
        description: function(action, data) {
            return $http.post(options.api.base_url + action, data);
        }
    }
})