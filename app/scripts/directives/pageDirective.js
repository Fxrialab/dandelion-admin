angular.module('dandelionAdminApp').directive('PageDirective', function($log, $rootScope, $scope) {
    return {
        pageDialog: function(data) {
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
        }
    }
}
);
