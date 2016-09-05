'use strict';
/**
 * Slider Calculator
 *
 * @author Kris Rybak <kris.rybak@bradleydyer.com>
 */
htb.directive('sliderCalculator', function(){
    return {
        restrict : 'C',
        replace: false,
        templateUrl: 'htb/templates/slider-calculator.html',
        link: function(scope, element, attrs) {
            element.find('.slider.mortgage-deposit').slider({
                value: scope.deposit,
                min: 2500,
                max: 180000,
                step: 500,
                slide: function(event, ui) {
                    scope.deposit = ui.value;
                    scope.$apply();
                }
            });
            element.find('.slider.mortgage-interest-rate').slider({
                value: scope.interestRate,
                min: 1,
                max: 7,
                step: 0.01,
                slide: function(event, ui) {
                    scope.interestRate = ui.value;
                    scope.$apply();
                }
            });
            element.find('.slider.mortgage-length').slider({
                value: scope.mortgageLenght,
                min: 15,
                max: 35,
                step: 1,
                slide: function(event, ui) {
                    scope.mortgageLenght = ui.value;
                    scope.$apply();
                }
            });
            element.find('.slider.mortgage-monthly-repayment').slider({
                value: scope.repayment,
                min: scope.minRepayment,
                max: scope.maxRepayment,
                step: 1,
                slide: function(event, ui) {
                    scope.repayment = ui.value;
                    scope.$apply();
                }
            });
        }
    };
});
