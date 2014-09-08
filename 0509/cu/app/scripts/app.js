'use strict';

var app = angular.module('dandelionAdminApp', [
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
options.api.base_url = "http://dandelion-admin.local/api/";
//options.api.base_url = "http://admin.dandelionet.org/php/";
app.config(function($routeProvider) {
    $routeProvider
            .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'app/views/manager/login.html',
    })
            .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl',
//       access: {requiredAuthentication: true}
    })
            .when('/manager', {
        templateUrl: 'app/views/manager/index.html',
        controller: 'ManagerIndexCtrl',
//        access: {requiredAuthentication: true}
    })
            .when('/users', {
        templateUrl: 'app/views/users/index.html',
        controller: 'UserCtrl',
//        access: {requiredAuthentication: true}
    })
            .when('/advancedSearch', {
        templateUrl: 'app/views/search/advancedSearch.html',
        controller: 'SearchCtrl',
//        access: {requiredAuthentication: true}
    })
            .when('/themes', {
        templateUrl: 'app/views/themes/index.html',
        controller: 'ThemeIndexCtrl',
//        access: {requiredAuthentication: true}
    })
            .when('/photos', {
        templateUrl: 'app/views/photos/index.html',
        controller: 'ManagerCtrl'
    })
            .when('/settings', {
        templateUrl: 'app/views/settings/index.html',
        controller: 'ManagerCtrl'
    })
            .when('/settings/edit', {
        templateUrl: 'app/views/settings/edit.html',
        controller: 'ManagerCtrl'
    })

            .otherwise({
        redirectTo: '/'
    });
});
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('tokenInterceptor');
});

app.run(function($rootScope, $location, $window, authService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication && !authService.isAuthenticated && !$window.sessionStorage.token) {
            $location.path("/login");
        } 

    });
});
