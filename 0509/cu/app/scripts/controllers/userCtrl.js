'use strict';

var app = angular.module('dandelionAdminApp');
app.controller('UserCtrl', function($scope, $http, ngDialog, $filter, $q, ngTableParams, $location, userService, authService) {
    if (authService.isAdmin == true) {
        getUser();
    }
    function getUser() {
        $scope.loadingPost = false;
        $scope.loadingComment = false;
        $scope.loadingPhoto = false;
        $scope.loading = true;
        $scope.load = false;
        userService.findAll()
                .success(function(custs) {
            $scope.loading = false;
            $scope.load = true;
            var data = custs;

            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 20, // count per page
                sorting: {
                    username: 'asc', // initial sorting username
                },
                filter: {
                    username: '', // initial filter
                    email: '', // initial filter
                }
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ?
                            $filter('orderBy')(data, params.orderBy()) :
                            data;
                    orderedData = params.filter() ?
                            $filter('filter')(orderedData, params.filter()) :
                            orderedData;

                    $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve($scope.users);
                }
            });
        })
                .error(function(error) {
            $scope.status = 'Unable to load customer data: ' + error.message;
        });

    }


    $scope.checkboxes = {'checked': false, items: {}};

    // watch for check all checkbox
    $scope.$watch('checkboxes.checked', function(value) {
        angular.forEach($scope.users, function(item) {
            if (angular.isDefined(item.id)) {
                $scope.checkboxes.items[item.id] = value;
            }
        });
    });
    // watch for data checkboxes
    $scope.$watch('checkboxes.items', function(values) {
        if (!$scope.users) {
            return;
        }
        var checked = 0, unchecked = 0,
                total = $scope.users.length;
        angular.forEach($scope.users, function(item) {
            checked += ($scope.checkboxes.items[item.id]) || 0;
            unchecked += (!$scope.checkboxes.items[item.id]) || 0;
        });
        if ((unchecked == 0) || (checked == 0)) {
            $scope.checkboxes.checked = (checked == total);
        }
        // grayed checkbox
        angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
    }, true);
    $scope.detailUser = function(user) {
        userService.findByPk(user).success(function(data) {
            $scope.user = data;
        });
        ngDialog.open({
            template: 'app/views/users/detail.html',
            className: 'ngdialog-theme-plain',
            scope: $scope,
        });
    };
    $scope.status = function(user) {
        userService.status(user).success(function(data) {
            $(".status_" + data.id).html(data.status);
        });
    };
    $scope.closeDialog = function() {
        ngDialog.close();
    };
})
