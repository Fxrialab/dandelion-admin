var app = angular.module('app', []);

app.directive('datepicker', function($parse) {
    return function(scope, element, attrs, controller) {
        var ngModel = $parse(attrs.ngModel);
        $(function() {
            element.datepicker({
                showOn: "both",
                changeYear: true,
                changeMonth: true,
                dateFormat: 'yy-mm-dd',
                maxDate: new Date(),
                yearRange: '1920:2012',
                onSelect: function(dateText, inst) {
                    scope.$apply(function(scope) {
                        // Change binded variable
                        ngModel.assign(scope, dateText);
                    });
                }
            });
        });
    }
});