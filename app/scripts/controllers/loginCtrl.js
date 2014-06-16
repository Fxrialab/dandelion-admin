'use strict';

var app = angular.module('dandelionAdminApp');
app.controller('LoginCtrl', function($scope, $http, ngDialog, $window, $rootScope, $location, ManagerService, AuthService) {
    getLogin();
    function getLogin() {
        $scope.errorUsername = false;
        $scope.username = true;
        $scope.password = true;
        $scope.email = false;
        $scope.forgot = true;
        $scope.text = 'Forgot password';
        $scope.title = 'Login';
        ngDialog.open({
            template: 'app/views/manager/login.html',
            className: 'ngdialog-theme-plain',
            scope: $scope,
            closeByDocument: false,
            plain: false,
        });

    }
    $scope.forgotPassword = function(data) {
        if (data == true) {
            $scope.username = false;
            $scope.password = false;
            $scope.email = true;
            $scope.forgot = false;
            $scope.text = 'Cancel';
            $scope.title = 'Forgot password';
        } else {
            $scope.username = true;
            $scope.password = true;
            $scope.email = false;
            $scope.forgot = true;
            $scope.text = 'Forgot password';
            $scope.title = 'Login';
        }

    }
    $scope.error = function() {
        return $scope.loginForm.username;
    };
    $scope.loginForm = function login() {
        var username = $scope.loginForm.username;
        var password = $scope.loginForm.password;
        var email = $scope.loginForm.email;
        if (email) {
            ManagerService.forgotPassword(email)
                    .success(function(data) {
                if (data) {
                    $scope.msg = data.msg;
                }
            })
        } else {
            if (username != null && password != null) {
                ManagerService.login(username, password)
                        .success(function(data) {
                    if (data.error == 'errorUsername') {
                        $scope.errorUsername = true;
                    } else if (data.error == 'errorPassword') {
                        $scope.errorPassword = true;
                    } else {
                        AuthService.isAuthenticated = true;
                        AuthService.isAdmin = true;
                        $window.sessionStorage.token = data.token;
                        $rootScope.userID = data.userID;
                        $rootScope.username = data.username;
                        $rootScope.email = data.email;
                        $rootScope.fullName = data.fullName;
                        ngDialog.close();
                        $location.path("/search");
                    }

                })
            }
        }
    }
    $scope.logout = function logOut() {
        if (ManagerService.isAuthenticated) {
            ManagerService.logout().success(function(data) {
                AuthService.isAuthenticated = false;
                AuthService.isAdmin = false;
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
})
