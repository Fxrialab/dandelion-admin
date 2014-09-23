Dandelion.controller('listPhotoCtrl', function($scope, Data, $cookieStore, ngTableParams, $filter, $dialogs, $modal, $rootScope, $routeParams) {
    getData();
    /**
     * find list Group
     */
    function getData() {
        Data.get('photos?token=' + $routeParams.token).then(function(response) {
            $scope.data = response;
            var data = response;
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 20, // count per page
                filter: {
                    fileName: '', // initial filter
                }
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.filter() ?
                            $filter('filter')(data, params.filter()) :
                            data;

                    $scope.photo = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve($scope.photo);
                }
            });
        });
    }

});