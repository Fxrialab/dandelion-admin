Dandelion.controller('dashboardCtrl', function($scope, Data, $cookieStore, $dialogs, $modal, $rootScope, $routeParams) {
    getData();
    function getData() {
        Data.get('main?token=' + $cookieStore.get('token')).then(function(response) {
            $scope.data = response;
        });
    }
});
