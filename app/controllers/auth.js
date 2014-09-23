//Login
Dandelion.controller('listAdminCtrl', function($scope, $rootScope, $location, $q, $routeParams, $filter, ngTableParams, $window, $cookieStore, Data) {
    Data.get('admin?token=' + $routeParams.token).then(function(results) {
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

                $scope.admin = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.admin);
            }
        });
    });
    $scope.active = function(id) {
        Data.get('adminactive?id=' + id + '&token=' + $cookieStore.get('token')).then(function(results) {
            $('.admin_' + results.id).html(results.status);
        });
    }

});

Dandelion.controller('loginCtrl', function($scope, $rootScope, $location, $http, $cookieStore, Data) {
    if ($cookieStore.get('token')) {
        $location.path();
    }
    $scope.login = {};
    $scope.doLogin = function(data) {
        Data.post('login', {
            data: data
        }).then(function(results) {
            Data.toast(results);
            $cookieStore.put('token', results.token);
            $rootScope.wrapper = 'wrapper';
            if (results.status == "success") {
                $location.path('/');
            } else
            {
                $rootScope.wrapper = '';
            }
        });
    };
});
Dandelion.controller('authCtrl', function($scope, $rootScope, $routeParams, $window, $location, $http, $cookieStore, Data) {
    $scope.signup = {};
    $scope.signup = {username: '', email: '', password: '', name: '', phone: '', address: ''};
    $scope.signUp = function(data) {
        Data.post('register/' + $cookieStore.get('token'), {
            data: data
        }).then(function(results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/admin/' + $cookieStore.get('token'));
            }
        });
    };
    $scope.logout = function() {
        Data.get('logout').then(function(results) {
            Data.toast(results);
            $cookieStore.remove('token');
            $rootScope.wrapper = '';
            $location.path('login');
        });
    }
});

Dandelion.controller('profileCtrl', function($scope, $rootScope, $routeParams, $window, $location, $http, Data) {
    Data.get('profile?token=' + $routeParams.token).then(function(results) {
        $scope.profile = results;
    });
    $scope.doProfile = function(data) {
        Data.put('update', {
            data: data
        }).then(function(results) {
            $scope.success = results;

        });
    };
});

Dandelion.controller('detailAdminCtrl', function($scope, $routeParams, ngTableParams, Data) {
    Data.get('profile?id=' + $routeParams.id + '&token=' + $routeParams.token).then(function(results) {
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