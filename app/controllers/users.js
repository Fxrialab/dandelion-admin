app.controller('userCtrl', function($scope, $rootScope, $routeParams, $window, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $rootScope.$rootScope = 'user';
});

app.controller('listUserCtrl', function($scope, ngTableParams, Data) {
    Data.get('users').then(function(results) {
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

app.controller('detailUserCtrl', function($scope, $routeParams, ngTableParams, Data) {
    Data.get('user?id=' + $routeParams.id).then(function(results) {
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