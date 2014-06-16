angular.module('dandelionAdminApp')
        .factory('AuthService', function() {
    var auth = {
        isAuthenticated: false,
        isAdmin: false
    }

    return auth;
})

        .factory('TokenInterceptor', function($q, $window, $location, AuthService) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function(response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthService.isAuthenticated) {
                AuthService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                AuthService.isAuthenticated = false;
                $location.path("/login");
            }

            return $q.reject(rejection);
        }
    };
})

        .factory('ManagerService', function($http) {
    return {
        findAll: function() {
            return $http.post(options.api.base_url + 'admin');
        },
        findByPk: function(data) {
            return $http.post(options.api.base_url + 'profile', data);
        },
        login: function(username, password) {
            return $http.post(options.api.base_url + 'login', {username: username, password: password});
        },
        logout: function() {
            return $http.post(options.api.base_url + 'logout');
        },
        register: function(data) {
            return $http.post(options.api.base_url + 'register', data);
        },
        forgotPassword: function(email) {
            return $http.post(options.api.base_url + 'forgotPassword', {email: email});
        },
        update: function(data) {
            return $http.post(options.api.base_url + 'update', data);
        },
        del: function(data) {
            return $http.post(options.api.base_url + 'delete', data);
        },
        checkUsername: function(data) {
            return $http.post(options.api.base_url + 'checkUser', data);
        },
        checkEmail: function(data) {
            return $http.post(options.api.base_url + 'checkEmail', data);
        }
    }
})
