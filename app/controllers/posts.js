Dandelion.controller('listPostCtrl', function($scope, $rootScope, ngTableParams, $filter, $routeParams, $cookieStore, Data) {
    Data.get('posts?token=' + $routeParams.token).then(function(results) {
        var data = results;
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 20, // count per page
            filter: {
                content: '', // initial filter
            }
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.filter() ?
                        $filter('filter')(data, params.filter()) :
                        data;

                $scope.posts = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.posts);
            }
        });
    });

    $scope.active = function(id) {
        Data.get('postactive?id=' + id + '&token=' + $cookieStore.get('token')).then(function(results) {
            $('.post_' + results.id).html(results.active);
        });
    }

});

Dandelion.controller('listCommentCtrl', function($scope, ngTableParams, $filter, $routeParams, Data) {
    function getData() {
        Data.get('comments?sort=' + $routeParams.sort + '&token=' + $routeParams.token).then(function(results) {
            var data = results;
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 20, // count per page
                filter: {
                    content: '', // initial filter
                }
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;

                    $scope.posts = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve($scope.posts);
                }
            });
        });
    }
    getData();
});