app.controller('listThemeCtrl', function($scope, ngTableParams, Data) {
    Data.get('themes').then(function(results) {
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

    $scope.install = function(data) {
        Data.get('install?id=' + data).then(function(results) {
            var data = results;
        });
    }

});
