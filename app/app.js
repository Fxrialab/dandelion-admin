var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngTable']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
        $routeProvider.
                when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
                .when('/logout', {
            title: 'Logout',
            templateUrl: 'partials/login.html',
            controller: 'logoutCtrl'
        })
                .when('/signup', {
            title: 'Signup',
            templateUrl: 'partials/signup.html',
            controller: 'authCtrl'
        })
                .when('/dashboard', {
            title: 'Dashboard',
            templateUrl: 'partials/dashboard.html'
        })
                .when('/users', {
            title: 'List User',
            controller: 'listUserCtrl',
            templateUrl: 'partials/users/list.html'
        })
                .when('/user/:id', {
            controller: 'detailUserCtrl',
            templateUrl: 'partials/users/detail.html'
        })
                .when('/posts', {
            controller: 'listPostCtrl',
            templateUrl: 'partials/posts/list.html'
        })
                .when('/comments', {
            controller: 'listCommentCtrl',
            templateUrl: 'partials/posts/comment.html'
        })
                  .when('/themes', {
            controller: 'listThemeCtrl',
            templateUrl: 'partials/themes/list.html'
        })
                  .when('/profile', {
            controller: 'profileCtrl',
            templateUrl: 'partials/users/profile.html'
        })
                     .when('/error', {
            templateUrl: 'partials/error.html'
        })
                .when('/', {
              templateUrl: 'partials/dashboard.html'
        })
                .otherwise({
            redirectTo: '/error'
        });
    }])
        .run(function($rootScope, $location, $window, Data, $routeParams) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        $rootScope.authenticated = false;
        $rootScope.nav = false;
        $rootScope.wrapper = '';
        if ($window.sessionStorage.token) {
            Data.get('session?token=' + $window.sessionStorage.token).then(function(results) {
                if (results.userID) {
                    $rootScope.authenticated = true;
                    $rootScope.userID = results.userID;
                    $rootScope.name = results.fullName;
                    $rootScope.email = results.email;
                    $rootScope.nav = true;
                    $rootScope.wrapper = 'wrapper';
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {
                    } else {
                        $location.path("/login");
                    }
                }
            });
        }
    });
});