var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngTable', 'ngCookies', 'blueimp.fileupload', 'ui.bootstrap', 'dialogs', 'ngTableExport']);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
        $routeProvider.
                when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        })
                .when('/dashboard/:token', {
            templateUrl: 'partials/dashboard.html'
        })
                .when('/users/:token', {
            controller: 'listUserCtrl',
            templateUrl: 'partials/users/list.html'
        })
                .when('/user/:id/:token', {
            controller: 'detailUserCtrl',
            templateUrl: 'partials/users/detail.html'
        })
                .when('/posts/:token', {
            controller: 'listPostCtrl',
            templateUrl: 'partials/posts/list.html'
        })
//                .when('/comments/:token', {
//            controller: 'listCommentCtrl',
//            templateUrl: 'partials/posts/comment.html'
//        })
                .when('/comments/:sort/:token', {
            controller: 'listCommentCtrl',
            templateUrl: 'partials/posts/comment.html'
        })
                .when('/themes/:token', {
            controller: 'listThemeCtrl',
            templateUrl: 'partials/themes/list.html'
        })
                .when('/themes/:id/:token', {
            controller: 'detailThemeCtrl',
            templateUrl: 'partials/themes/detail.html'
        })
                .when('/upload/:token', {
            templateUrl: 'partials/themes/upload.html'
        })
                .when('/download/:token', {
            controller: 'downloadThemeCtrl',
            templateUrl: 'partials/themes/download.html'
        })
                .when('/profile/:token', {
            controller: 'profileCtrl',
            templateUrl: 'partials/users/profile.html'
        })
                .when('/groups/:token', {
            controller: 'listGroupCtrl',
            templateUrl: 'partials/groups/list.html'
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
        .run(function($rootScope, $location, $window, Data, $routeParams, $cookieStore) {

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        $rootScope.authenticated = false;
        $rootScope.wrapper = '';
        var token = $cookieStore.get('token');
        if (token) {
            Data.get('session?token=' + token).then(function(results) {
                if (results.userID) {
                    $rootScope.authenticated = true;
                    $rootScope.userID = results.userID;
                    $rootScope.name = results.fullName;
                    $rootScope.email = results.email;
                    $rootScope.token = results.token;
                    $rootScope.wrapper = 'wrapper';
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {
                    } else {
                        $location.path("/login");
                    }
                }
            });
        } else {
            $location.path("/login");
        }





    });
});

var comfirmCtrl = function($scope, $modalInstance, deleteItem) {
    $scope.item = deleteItem;
    $scope.ok = function() {
        $modalInstance.close();
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

};