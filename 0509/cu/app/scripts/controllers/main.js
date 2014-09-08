'use strict';

angular.module('dandelionAdminApp')
        .controller('MainCtrl', function($scope, ManagerService, ngDialog) {
    $scope.profile = function(data) {
        var data = {
            id: data,
        };
        ManagerService.findByPk(data).success(function(data) {
            $scope.update = data;
            ngDialog.open({
                template: 'app/views/manager/profile.html',
                className: 'ngdialog-theme-plain',
                scope: $scope,
            });
        });

    };
    $scope.closeDialog = function() {
        ngDialog.close();
    };
})

