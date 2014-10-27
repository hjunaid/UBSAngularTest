'use strict';

angular.module('UBSAngularApp')
    .directive('currencyInput', ['$filter', function ($filter) {
        return {
            require:'ngModel',
            restrict: 'A',
            link: function postLink(scope, element, attrs, ctrl) {

                var currencyShortcuts = {'k': '000', 'm': '000000', 'b': '000000000'},
                    hundredBillion = 100 * 1000 * 1000 * 1000, lastDot =/\.$/;

                element.on('keyup', function () {
                    //Forcing angular to update view since parsers are not called consistently. Need optimizing.
//                    ctrl.$setViewValue(element.val());
                })

                scope.$watch(attrs.ngModel, function(){
                    ctrl.$setViewValue(element.val());
                })

                ctrl.handleShortCuts = function (val) {
                    return val.replace(/[kmb]$/, function (shortCut) {
                        return  currencyShortcuts[shortCut];
                    })
                }

                ctrl.removeNonDigits = function (val) {
                    return val.replace(/[^.0-9]/g, '');
                }

                ctrl.parseCurrency = function (val) {
                    return parseFloat(val);
                }

                ctrl.limitMaxValue = function (val) {
                    console.log(val)
                    return Math.min(hundredBillion, val);
                }

                ctrl.updateView = function (val) {
                    var hasLastDot = lastDot.test(element.val());
                    var formattedValue = ctrl.formatValue(val);
                    formattedValue= hasLastDot?formattedValue+'.':formattedValue;
                    element.val(formattedValue);
                    return val;
                }

                ctrl.formatValue = function (val) {
                    var val = $filter('number')(val, 10);
                    val = val.replace(/[.]?0+$/, '');
                    return val;
                }


//                ctrl.$parsers.unshift(ctrl.updateView);
                ctrl.$parsers.unshift(ctrl.limitMaxValue);
                ctrl.$parsers.unshift(ctrl.parseCurrency);
                ctrl.$parsers.unshift(ctrl.removeNonDigits);
                ctrl.$parsers.unshift(ctrl.handleShortCuts);

                ctrl.$formatters.unshift(ctrl.formatValue);

                ctrl.$render = function(){
                    ctrl.$setViewValue(ctrl.$modelValue)
                }

                scope.$on('$destroy', function(){
                    element.off('keyup');
                })
            }
        };
    }]);
