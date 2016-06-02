angular.module('myApp.directives', [])
.directive('btrValidation', function() {
    function findFormGroup(el) {
        if (el.hasClass('form-group')) {
            return el;
        } else if (el.parent()) {
            return findFormGroup(el.parent());
        }

        return null;
    }

    return {
        restrict : 'A',
        require : 'ngModel',
        link : function(scope, el, attrs, inputCtrl) {
            var parentEl = findFormGroup(el.parent());

            do {
                if (parentEl.hasClass('form-group')) {
                    scope.$watch(function() {
                        return inputCtrl.$valid;
                    }, function() {
                        parentEl.toggleClass('has-error', inputCtrl.$invalid);
                        parentEl.toggleClass('has-success', inputCtrl.$valid);
                    });
                    break;
                }
                parentEl = parentEl.parent();
            } while (parentEl.length > 0);
        }
    }
});
