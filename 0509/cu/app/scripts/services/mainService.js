angular.module('dandelionAdminApp')
        .factory('mainService', function($http) {
    return {
        main: function() {
            return $http.post(options.api.base_url + 'main');
        },
        theme: function() {
            return $http.post(options.api.base_url + 'theme');
        }
    }
})