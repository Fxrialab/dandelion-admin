'use strict';

var app = angular.module('dandelionAdminApp');
app.controller('CommentCtrl', function($scope, $http, ngDialog, $filter, ngTableParams, commentService) {
    $scope.listComment = function(user) {
        $scope.value = true;
        $scope.loadingComment = true;
        commentService.findAll(user).success(function(data) {
            var data = data;
            $scope.loadingComment = false;
            $scope.tableParamsDialog = new ngTableParams({
                page: 1, // show first page
                count: 10, // count per page
                sorting: {
                    content: 'asc', // initial sorting username
                },
                filter: {
                    content: '', // initial filter
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
            ngDialog.open({
                template: 'app/views/comments/comment.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
            });
        });

    };

    $scope.closeDialog = function() {
        ngDialog.close();
    };
})
