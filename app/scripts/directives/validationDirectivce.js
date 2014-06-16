var app = angular.module('dandelionAdminApp');
app.directive('ngUnique', function($http, ManagerService) {

    return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {

            var $elem = $(elem);
            alert('123');
            // Trigger on blur of email input
            $elem.on('blur', function(evt) {

                // Check when the email is valid first
                if (scope.registerForm.email.$valid) {

                    // We're out of Angular here so we need to apply to scope
                    scope.$apply(function() {

                        console.log('checking email is available...');
                        // Ajax request to check if email is available
                        var data = {
                            "email": $elem.val(),
                            "dbField": attrs.ngUnique
                        };
                        ManagerService.checkUser(data).
                                success(function(data, status, headers, config) {
                            console.log('ajax success...' + data.status);

                            // Set email is available/not available.
                            ctrl.$setValidity('unique', data.status);
                        }).
                                error(function(data, status, headers, config) {
                            console.log("ajax fail...(" + status + ").");
                            ctrl.$setValidity('unique', false);
                        });

                    });
                }

            });

        }

    }

});
