app.controller('listPostCtrl', function($scope, $rootScope, ngTableParams, $routeParams, $cookieStore, Data) {
    Data.get('posts?token=' + $routeParams.token).then(function(results) {
        var data = results;
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 20          // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    });

    $scope.active = function(id) {
        Data.get('postactive?id=' + id + '&token=' + $cookieStore.get('token')).then(function(results) {
            $('.post_' + results.id).html(results.active);
        });
    }

});

app.controller('listCommentCtrl', function($scope, ngTableParams, $routeParams, Data) {
    Data.get('comments?token=' + $routeParams.token).then(function(results) {
        var data = results;
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 20          // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    });

});