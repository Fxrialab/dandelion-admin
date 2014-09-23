var Dandelion = angular.module('dandelionAdminApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngTable', 'ngCookies', 'blueimp.fileupload', 'ui.bootstrap', 'dialogs', 'ngTableExport']);

Dandelion.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
        $routeProvider.
                when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        })
                .when('/dashboard/:token', {
            templateUrl: 'partials/dashboard.html'
        })
                         .when('/admin/add/:token', {
            controller: 'authCtrl',
            templateUrl: 'partials/admin/add.html'
        })
                .when('/admin/:token', {
            controller: 'listAdminCtrl',
            templateUrl: 'partials/admin/list.html',
        })
                .when('/admin/:id/:token', {
            controller: 'profileCtrl',
            templateUrl: 'partials/admin/detail.html'
        })

                .when('/users/:token', {
            controller: 'listUserCtrl',
            templateUrl: 'partials/users/list.html',
        })
                .when('/user/:id/:token', {
            controller: 'detailUserCtrl',
            templateUrl: 'partials/users/detail.html'
        })
                .when('/posts/:token', {
            controller: 'listPostCtrl',
            templateUrl: 'partials/posts/list.html'
        })
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
                .when('/themes_upload/:token', {
            templateUrl: 'partials/themes/upload.html'
        })
                .when('/themes_download/:token', {
            controller: 'downloadThemeCtrl',
            templateUrl: 'partials/themes/download.html'
        })
                .when('/plugins/:token', {
            controller: 'listPluginCtrl',
            templateUrl: 'partials/plugins/list.html'
        })
                .when('/plugins/:id/:token', {
            controller: 'detailThemeCtrl',
            templateUrl: 'partials/plugins/detail.html'
        })
                .when('/plugins_upload/:token', {
            templateUrl: 'partials/plugins/upload.html'
        })
                .when('/plugins_download/:token', {
            controller: 'downloadPluginCtrl',
            templateUrl: 'partials/plugins/download.html'
        })
                .when('/profile/:token', {
            controller: 'profileCtrl',
            templateUrl: 'partials/users/profile.html'
        })
                .when('/groups/:token', {
            controller: 'listGroupCtrl',
            templateUrl: 'partials/groups/list.html'
        })
                .when('/photos/:token', {
            controller: 'listPhotoCtrl',
            templateUrl: 'partials/photos/list.html'
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
        .run(function($rootScope, $location, $route, $window, Data, $routeParams, $cookieStore) {

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        $rootScope.authenticated = false;
        $rootScope.wrapper = '';
//        $rootScope.$location = $location;
        $rootScope.isActive = function(url) {
            var active = (url === $location.path());
            return active;
        };
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