'use strict';

var app = angular.module('dandelionLoginApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngDialog',
    'ngTable',
    'blueimp.fileupload'
]);
var options = {};
options.api = {};
options.api.base_url = "http://dandelion-admin.local/php/";
//options.api.base_url = "http://admin.dandelionet.org/php/";
app.config(function($routeProvider) {
    $routeProvider
            .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'app/views/main.html',
    })
            .otherwise({
        redirectTo: '/login'
    });
});
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
});

app.run(function($rootScope, $location, $window, authService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication
                && !authService.isAuthenticated && !$window.sessionStorage.token) {
            $location.path("/login");
        }
    });
});
app.config(function($httpProvider, fileUploadProvider) {
}
)