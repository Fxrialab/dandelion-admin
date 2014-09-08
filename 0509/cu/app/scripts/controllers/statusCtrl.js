'use strict';

var app = angular.module('dandelionAdminApp');

app.controller('StatusCtrl', function($scope, $http, ngDialog, $filter, ngTableParams, StatusService, SearchService) {
    $scope.listStatus = function(user) {
        $scope.value = true;
        StatusService.findAll(user).success(function(data) {
            var data = data;
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
                template: 'app/views/posts/post.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
            });
        });

    };
    $scope.loading = false;
    $scope.load = false;
    $scope.from = $scope.to = new Date();
    $scope.search = function search() {
        var keyword = $scope.search.keyword;
        var post = $scope.search.post;
        var comment = $scope.search.comment;
        var from = $scope.search.from;
        var to = $scope.search.to;
        $scope.loading = true;
        SearchService.search(keyword, comment, post, from, to).success(function(data) {
            $scope.result = data;
            $scope.loading = false;
            $scope.load = true;
        })

    }

    $scope.closeDialog = function() {
        ngDialog.close();
    };
})
