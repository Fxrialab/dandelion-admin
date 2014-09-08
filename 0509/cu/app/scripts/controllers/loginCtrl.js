'use strict';

var app = angular.module('dandelionAdminApp');
app.controller('LoginCtrl', function($scope, $http, ngDialog, $window, $rootScope, $location, managerService, authService) {
//    getLogin();
//    function getLogin() {
//        $scope.errorUsername = false;
//        $scope.username = true;
//        $scope.password = true;
//        $scope.email = false;
//        $scope.forgot = true;
//        $scope.text = 'Forgot password';
//        $scope.title = 'Login';
//        $scope.loading = false;
//        ngDialog.open({
//            template: 'app/views/manager/login.html',
//            className: 'ngdialog-theme-plain',
//            scope: $scope,
//            closeByDocument: false,
//            plain: false,
//        });
//
//    }
    $scope.forgotPassword = function(data) {
        if (data == true) {
            $scope.username = false;
            $scope.password = false;
            $scope.email = true;
            $scope.forgot = false;
            $scope.loading = false;
            $scope.text = 'Cancel';
            $scope.title = 'Forgot password';
        } else {
            $scope.username = true;
            $scope.password = true;
            $scope.email = false;
            $scope.forgot = true;
            $scope.text = 'Forgot password';
            $scope.title = 'Login';
            $scope.loading = false;
        }

    }
    $scope.error = function() {
        return $scope.loginForm.username;
    };
    $scope.loginForm = function login() {
        var username = $scope.loginForm.username;
        var password = $scope.loginForm.password;
        var email = $scope.loginForm.email;
        $scope.loading = true;
        if (email) {
            managerService.forgotPassword(email)
                    .success(function(data) {
                if (data) {
                    $scope.msg = data.msg;
                }
            })
        } else {
            if (username != null && password != null) {
                $http({
                    url: options.api.base_url + 'login',
                    method: "POST",
                    data: {username: username, password: password},
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data, status, headers, config) {
                    $location.path('dashboard')
                }).error(function(data, status, headers, config) {
                    $scope.status = status;
                });
            }
        }
    }
    $scope.logout = function logOut() {
        if (managerService.isAuthenticated) {
            managerService.logout().success(function(data) {
                authService.isAuthenticated = false;
                authService.isAdmin = false;
                delete $window.sessionStorage.token;
                $location.path("/login");
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }
        else {
            $location.path("login");
        }
    }
    $scope.closeDialog = function() {
        ngDialog.close();
    };
}
)
