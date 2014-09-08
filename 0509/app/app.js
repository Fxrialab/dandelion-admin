'use strict';

var app = angular.module('dandelionAdminApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
 //   'ngDialog',
 //   'ngTable',
 //   'blueimp.fileupload'
]);
var options = {};
options.api = {};
options.api.base_url = "http://dandelion-admin.local/api/";
app.config(function($routeProvider) {
    $routeProvider
            .when('/login', {
			 templateUrl: 'login.html',
    })
            .when('/', {
        templateUrl: 'app/views/dashboard/index.html',
    })
            .otherwise({
        redirectTo: '/'
    });
});
