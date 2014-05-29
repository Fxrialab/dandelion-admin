'use strict';

angular.module('dandelionAdminApp')
        .controller('MainCtrl', function($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
})
        .controller('ManagerCtrl', function($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
})
        .controller('Ctrl', function($scope) {
//    $scope.value = 'Anytime';
    $scope.specialValue = {
        "id": "12345",
        "value": "green"
    };
    $scope.userInfo = {
        person: {
            mDate: '1967-10-07'
        }
    };
    $scope.newValue = function(value) {
        console.log(value);
    }
})