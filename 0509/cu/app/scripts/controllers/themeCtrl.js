'use strict';

var app = angular.module('dandelionAdminApp');
app.controller('ThemeIndexCtrl', function($scope, $http, ngDialog, $filter, $location, $q, ngTableParams, themeService, authService) {
    if (authService.isAdmin == true) {
        getData();
    }

    function getData() {
        $scope.loading = true;
        $scope.load = false;
        themeService.findAll()
                .success(function(data) {
            var data = data;
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
app.controller('ThemeCtrl', function($scope, $http, ngDialog, $filter, $location, $q, ngTableParams, themeService, authService) {
    $scope.addTheme = function() {
        $scope.value = true;
        ngDialog.open({
            template: 'app/views/themes/upload.html',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
    }
    $scope.detailTheme = function(theme) {

        var data = {
            id: theme,
        };
        themeService.findByPk('detailTheme', data).success(function(data) {
            $scope.theme = data;
        });
        ngDialog.open({
            template: 'app/views/themes/detail.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
        });
    };
    $scope.edit = function(theme) {
        $scope.success = false;
        var data = {
            id: theme,
        };
        themeService.findByPk('detailTheme', data).success(function(data) {
            $scope.file = data;
        });
        ngDialog.open({
            template: 'app/views/themes/edit.html',
            className: 'ngdialog-theme-plain',
            scope: $scope,
        });
    };
    $scope.submitForm = function() {
        var data = {
            id: $scope.file.id,
            description: $scope.file.description
        };
        $http.post(options.api.base_url + 'description', data).success(function(data) {
            $scope.success = true;
        });

    };
    $scope.closeDialog = function() {
        ngDialog.close();
    };
    $scope.del = function(theme) {
        if (confirm("Are you sure to delete this line?")) {
            var data = {
                id: theme,
            };
            themeService.findByPk('deleteTheme', data).success(function(data) {
                if (data == 1) {
                    $('.admin_' + admin).remove();
                } else {
                    alert('No delete');
                }


            });
        }
    };
    $scope.install = function(theme) {
        var data = {
            id: theme,
        };
        themeService.findByPk('install', data).success(function(data) {
        });
    };
})

app.controller('UploadCtrl', [
    '$scope', '$http', '$filter', '$window',
    function($scope, $http) {
        $scope.options = {
            url: options.api.base_url + 'upload',
        };


    }
])

app.controller('FileDestroyCtrl', [
    '$scope', '$http',
    function($scope, $http) {
        var file = $scope.file,
                state;
        if (file.url) {
            file.$state = function() {
                return state;
            };
            file.$destroy = function() {
                state = 'pending';
                return $http({
                    url: options.api.base_url + 'deleteFile?file=' + file.name
                }).then(
                        function() {
                            state = 'resolved';
                            $scope.clear(file);
                        },
                        function() {
                            state = 'rejected';
                        }
                );
            };
        } else if (!file.$cancel && !file._index) {
            file.$cancel = function() {
                $scope.clear(file);
            };
        }
    }
]);