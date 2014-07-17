'use strict';

var app = angular.module('dandelionAdminApp');

app.controller('SearchCtrl', function($scope, $http, ngDialog, $filter, $location, searchService) {
    $scope.loading = false;
    $scope.load = false;
    $scope.from = $scope.to = new Date();
    $scope.search = function search() {
        var keyword = $scope.search.keyword;
        var user = $scope.search.user;
        var post = $scope.search.post;
        var comment = $scope.search.comment;
        var from = $scope.search.from;
        var to = $scope.search.to;
        $scope.loading = true;
        searchService.advancedSearch(keyword, user, comment, post, from, to).success(function(data) {
            $scope.result = data;
            $scope.loading = false;
            $scope.load = true;
        })

    }

    $scope.closeDialog = function() {
        ngDialog.close();
    };
})
