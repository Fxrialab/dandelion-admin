'use strict';

var app = angular.module('dandelionAdminApp');
app.controller('ManagerIndexCtrl', function($scope, $http, ngDialog, $filter, $location, $q, ngTableParams, managerService, authService) {
    if (authService.isAdmin == true) {
        getManager();
    }

    function getManager() {
        $scope.loading = true;
        $scope.load = false;
        managerService.findAll()
                .success(function(custs) {
            var data = custs;
            $scope.loading = false;
            $scope.load = true;
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 20, // count per page
                sorting: {
                    name: 'asc', // initial sorting username
                },
                filter: {
                    name: '', // initial filter
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
})
app.controller('ManagerCtrl', function($scope, $http, ngDialog, $filter, $location, $q, ngTableParams, managerService, authService) {

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

    $scope.changeUsername = function() {
        var data = {
            username: $scope.submitForm.username,
        };
        managerService.checkUsername(data).success(function(data) {
            if (data) {
                $scope.showUsername = true;
                $scope.errorUsername = data;
            } else {
                $scope.showUsername = false;
                $scope.errorUsername = '';
            }

        });
    };

    $scope.changeEmail = function() {
        var data = {
            email: $scope.submitForm.email,
        };
        managerService.checkEmail(data).success(function(data) {
            if (data) {
                $scope.showEmail = true;
                $scope.errorEmail = data;
            } else {
                $scope.showEmail = false;
                $scope.errorEmail = '';
            }

        });
    };

    $scope.submitForm = function(isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            var data = {
                fullName: $scope.submitForm.fullName,
                username: $scope.submitForm.username,
                email: $scope.submitForm.email,
                password: $scope.submitForm.password
            };
     
            managerService.register(data).success(function(data, element) {
                ngDialog.close();
                $location.path("/manager");
            });
        }

    };
    $scope.submitProfile = function(isValid) {
        // check to make sure the form is completely valid
        if (isValid) {
            var data = {
                id: $scope.update.id,
                fullName: $scope.update.name,
                username: $scope.update.username,
                email: $scope.update.email,
                currentPassword: $scope.update.currentPassword,
                newPassword: $scope.update.newPassword
            };
            managerService.update(data).success(function(data) {
                $scope.msg = data;
            });
        }

    };
    $scope.del = function(admin) {
        if (confirm("Are you sure to delete this line?")) {
            var data = {
                id: admin,
            };
            managerService.del(data).success(function(data) {
                if (data == 1) {
                    $('.admin_' + admin).remove();
                } else {
                    alert('No delete');
                }


            });
        }
    };

    $scope.addManager = function() {
        $scope.value = true;
        $scope.showUsername = false;
        ngDialog.open({
            template: 'app/views/manager/add.html',
            className: 'ngdialog-theme-plain',
            scope: $scope
        });
    };


    $scope.closeDialog = function() {
        ngDialog.close();
    };
});
