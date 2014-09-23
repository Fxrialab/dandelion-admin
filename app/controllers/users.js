Dandelion.controller('userCtrl', function($scope, $rootScope, $routeParams, $window, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $rootScope.$rootScope = 'user';
});

Dandelion.controller('listUserCtrl', function($scope, $rootScope, $location, $q, $routeParams, $filter, ngTableParams, $window, $cookieStore, Data) {
    Data.get('users?token=' + $routeParams.token).then(function(results) {
        var data = results;
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10, // count per page
            sorting: {
                name: 'asc', // initial sorting
                email: 'asc', // initial sorting
            },
            filter: {
                name: '', // initial filter
                email: ''       // initial filter
            }
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting ?
                        $filter('orderBy')(data, params.orderBy()) :
                        data;
                orderedData = params.filter ?
                        $filter('filter')(orderedData, params.filter()) :
                        orderedData;

                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.users);
            }
        });
    });
    $scope.active = function(id) {
        Data.get('useractive?id=' + id + '&token=' + $cookieStore.get('token')).then(function(results) {
            $('.user_' + results.id).html(results.status);
        });
    }

});

Dandelion.controller('detailUserCtrl', function($scope, $routeParams, ngTableParams, Data) {
    Data.get('user?id=' + $routeParams.id + '&token=' + $routeParams.token).then(function(results) {
        $scope.user = results.user;
        var data = results.status;
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 10          // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
        var com = results.comment;
        $scope.tableComment = new ngTableParams({
            page: 1, // show first page
            count: 10          // count per page
        }, {
            total: com.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(com.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    });
}
);