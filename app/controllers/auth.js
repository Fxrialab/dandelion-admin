app.controller('authCtrl', function($scope, $rootScope, $routeParams, $window, $location, $http, Data) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function(data) {
        Data.post('login', {
            data: data
        }).then(function(results) {
            Data.toast(results);
            $window.sessionStorage.token = results.token;
            $rootScope.wrapper = 'wrapper';
            if (results.status == "success") {
                $location.path('/');
            }
        });
    };
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
            $rootScope.nav = false;
            $rootScope.wrapper = '';
            $location.path('login');
        });
    }
});

app.controller('profileCtrl', function($scope, $rootScope, $routeParams, $window, $location, $http, Data) {
    Data.get('profile').then(function(results) {
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