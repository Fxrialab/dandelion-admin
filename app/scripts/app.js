'use strict';

angular
        .module('dandelionAdminApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
        .config(function($routeProvider) {
    $routeProvider
            .when('/', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl'
    })
            .when('/manager', {
        templateUrl: 'app/views/manager/index.html',
        controller: 'ManagerCtrl'
    })
            .when('/manager/add', {
        templateUrl: 'app/views/manager/add.html',
        controller: 'ManagerCtrl'
    })
            .when('/manager/detail/123', {
        templateUrl: 'app/views/manager/detail.html',
        controller: 'ManagerCtrl'
    })
            .when('/users', {
        templateUrl: 'app/views/users/index.html',
        controller: 'ManagerCtrl'
    })
            .when('/manager/user/123', {
        templateUrl: 'app/views/manager/detail.html',
        controller: 'ManagerCtrl'
    })
            .when('/posts', {
        templateUrl: 'app/views/posts/index.html',
        controller: 'ManagerCtrl'
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
        redirectTo: '/'
    });
});
