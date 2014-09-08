'use strict';

var app = angular.module('dandelionAdminApp');

app.controller('PhotoCtrl', function($scope, $http, ngDialog, $filter, ngTableParams, photoService) {
    $scope.listPhoto = function(id) {
        $scope.loadingPhoto = true;
        photoService.findAll(id).success(function(data) {
            $scope.loadingPhoto = false;
            $scope.result = data;
            ngDialog.open({
                template: 'app/views/photos/index.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
            });
        });

    };
    $scope.closeDialog = function() {
        ngDialog.close();
    };
})
