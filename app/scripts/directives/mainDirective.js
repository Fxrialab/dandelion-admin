'use strict';

angular.module('dandelionAdminApp')
        .directive('myHeader', function() {
    return {
        templateUrl: 'app/views/header.html'
    };
})
        .directive('myLeft', function() {
    return {
        templateUrl: 'app/views/left.html'
    };
});
