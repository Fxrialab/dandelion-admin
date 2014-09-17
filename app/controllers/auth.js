app.controller('loginCtrl', function($scope, $rootScope, $location, $http, $cookieStore, Data) {
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
app.controller('authCtrl', function($scope, $rootScope, $routeParams, $window, $location, $http, $cookieStore, Data) {
    $scope.signup = {};
    $scope.signup = {email: '', password: '', name: '', phone: '', address: ''};
    $scope.signUp = function(customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function(results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('/');
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

app.controller('profileCtrl', function($scope, $rootScope, $routeParams, $window, $location, $http, Data) {
    Data.get('profile?token=' + $routeParams.token).then(function(results) {
        $scope.profile = results;
    });
    $scope.doProfile = function(data) {
        Data.post('update', {
            data: data
        }).then(function(results) {
            $scope.success = results;

        });
    };
});