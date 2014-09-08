'use strict';

var app = angular.module('dandelionAdminApp');
app.controller('LoginCtrl', function($scope, $http, $window, $rootScope, $location) {
    $scope.submit = function login(user) {
      $http.post("api/login", user).success(
			function(response) {
				//do stuff with response
			}
		});
    }

}
)
