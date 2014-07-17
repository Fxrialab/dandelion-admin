'use strict';
angular.module('dandelionAdminApp')
        .controller('MainCtrl', function($scope, managerService, mainService, authService, ngDialog) {
    getData();
    /**
     * Comment
     */
    function getData() {
        mainService.main()
                .success(function(data) {
            $scope.countManager = data.countManager;
            $scope.countUser = data.countUser;
            $scope.countTheme = data.countTheme;
        })
                .error(function(error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });
    }
    $scope.profile = function(data) {
        var data = {
            id: data,
        };
        managerService.findByPk(data).success(function(data) {
            $scope.update = data;
            ngDialog.open({
                template: 'app/views/manager/profile.html',
                className: 'ngdialog-theme-plain',
                scope: $scope,
            });
        });

    }
    $scope.closeDialog = function() {
        ngDialog.close();
    };
})
