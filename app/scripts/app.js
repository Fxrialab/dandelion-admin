'use strict';

var app = angular.module('dandelionAdminApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngDialog',
    'ngTable',
]);
var options = {};
options.api = {};
options.api.base_url = "http://dandelion-admin.local/php/";
app.config(function($routeProvider) {
    $routeProvider
            .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'app/views/main.html',
    })
            .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl',
        access: {requiredAuthentication: true}
    })
            .when('/manager', {
        templateUrl: 'app/views/manager/index.html',
        controller: 'ManagerIndexCtrl',
        access: {requiredAuthentication: true}
    })
            .when('/users', {
        templateUrl: 'app/views/users/index.html',
        controller: 'UserCtrl',
        access: {requiredAuthentication: true}
    })
            .when('/search', {
        templateUrl: 'app/views/posts/index.html',
        controller: 'SearchCtrl'
    })
            .when('/posts', {
        templateUrl: 'app/views/posts/index.html',
        controller: 'StatusCtrl'
    })
            .when('/themes', {
        templateUrl: 'app/views/themes/index.html',
        controller: 'ManagerCtrl'
    })
            .when('/themes/detail/1', {
        templateUrl: 'app/views/themes/detail.html',
        controller: 'ManagerCtrl'
    })
            .when('/photos', {
        templateUrl: 'app/views/photos/index.html',
        controller: 'ManagerCtrl'
    })
            .when('/comments', {
        templateUrl: 'app/views/comments/index.html',
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
        redirectTo: '/login'
    });
});
app.config(function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});

app.run(function($rootScope, $location, $window, AuthService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication
                && !AuthService.isAuthenticated && !$window.sessionStorage.token) {
            $location.path("/login");
        }
    });
});