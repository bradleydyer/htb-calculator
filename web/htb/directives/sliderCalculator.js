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
            var $monthlyRepaymentSlider = element.find('.slider.mortgage-monthly-repayment');
            element.find('.slider.mortgage-deposit').slider({
                value: scope.deposit,
                min: 2500,
                max: 180000,
                step: 500,
                slide: function(event, ui) {
                    scope.deposit = ui.value;
                    scope.$apply();
                    $monthlyRepaymentSlider.slider("option","max", scope.maxRepayment);
                    $monthlyRepaymentSlider.slider("option","value", scope.repayment);
                    $monthlyRepaymentSlider.slider("option","min", scope.minRepayment);
                }
            });
            element.find('.slider.mortgage-interest-rate').slider({
                value: scope.interestRate,
                min: 2,
                max: 5,
                step: 0.01,
                slide: function(event, ui) {
                    scope.interestRate = ui.value;
                    scope.$apply();
                    $monthlyRepaymentSlider.slider("option","max", scope.maxRepayment);
                    $monthlyRepaymentSlider.slider("option","min", scope.minRepayment);
                }
            });
            element.find('.slider.mortgage-length').slider({
                value: scope.mortgageLenght,
                min: 25,
                max: 35,
                step: 1,
                slide: function(event, ui) {
                    scope.mortgageLenght = ui.value;
                    scope.$apply();
                    $monthlyRepaymentSlider.slider("option","max", scope.maxRepayment);
                    $monthlyRepaymentSlider.slider("option","min", scope.minRepayment);
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
            element.find('.info-bubble').bind('click', function() {
                var $targetPanel = jQuery('.' + jQuery(this).data('info-target') );
                scope.showInformationPanel(jQuery(this), $targetPanel);
            });
            element.find('.close-panel').bind('click', function(event) {
                scope.hideInformationPanel(jQuery(this).parent());
                event.preventDefault();
            });
        }
    };
});
