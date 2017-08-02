'use strict';
/**
 * Slider Calculator
 *
 * @author Kris Rybak <kris.rybak@bradleydyer.com>
 */
htb.directive('sliderCalculator', function($templateRequest, $compile){
    return {
        restrict : 'C',
        link: function(scope, element, attrs) {
            // Get default template
            var templatePath = 'htb/htb/templates/slider-calculator.html';

            // Use custom template if specified
            if (attrs.templatePath) {
                templatePath = attrs.templatePath;
            }

            $templateRequest(templatePath)
                .then(
                    function(html) 
                    {
                        var compiled = $compile(html)(scope);
                        element.html(compiled);
                        init();
                    },
                    function()
                    {
                        element.html("<p>Specified template not found</p>");
                    }
                );

            function init()
            {
                var $monthlyRepaymentNoUiSlider = element.find('.nouislider.mortgage-monthly-repayment')[0];
                var slider = element.find('.nouislider.mortgage-deposit')[0];
                noUiSlider.create(slider, {
                    animate: false,
                    start: scope.deposit,
                    connect: [true, false],
                    step: 500,
                    range: {
                        'min': 2500,
                        'max': 180000
                    }
                });
                slider.noUiSlider.on('slide', function(){
                    var value = parseInt(this.get());
                    scope.deposit = value;
                    scope.$apply();
                    $monthlyRepaymentNoUiSlider.noUiSlider.updateOptions({
                        range: {
                            'min': scope.minRepayment,
                            'max': scope.maxRepayment
                        }
                    });
                    $monthlyRepaymentNoUiSlider.noUiSlider.set(scope.repayment);
                });
                var sliderMortgageInterestRate = element.find('.nouislider.mortgage-interest-rate')[0];
                noUiSlider.create(sliderMortgageInterestRate, {
                    animate: false,
                    start: scope.interestRate,
                    connect: [true, false],
                    step: 0.01,
                    range: {
                        'min': 2,
                        'max': 5
                    }
                });
                sliderMortgageInterestRate.noUiSlider.on('slide', function(){
                    var value = parseFloat(this.get());
                    scope.interestRate = value;
                    scope.$apply();
                    $monthlyRepaymentNoUiSlider.noUiSlider.updateOptions({
                        range: {
                            'min': scope.minRepayment,
                            'max': scope.maxRepayment
                        }
                    });
                });
                var slider = element.find('.nouislider.mortgage-length')[0];
                noUiSlider.create(slider, {
                    animate: false,
                    start: scope.mortgageLenght,
                    connect: [true, false],
                    step: 1,
                    range: {
                        'min': 25,
                        'max': 35
                    }
                });
                slider.noUiSlider.on('slide', function(){
                    var value = parseInt(this.get());
                    scope.mortgageLenght = value;
                    scope.$apply();
                    $monthlyRepaymentNoUiSlider.noUiSlider.updateOptions({
                        range: {
                            'min': scope.minRepayment,
                            'max': scope.maxRepayment
                        }
                    });
                });
                var slider = element.find('.nouislider.mortgage-monthly-repayment')[0];
                noUiSlider.create(slider, {
                    animate: false,
                    start: scope.repayment,
                    connect: [true, false],
                    step: 1,
                    range: {
                        'min': scope.minRepayment,
                        'max': scope.maxRepayment
                    }
                });
                slider.noUiSlider.on('slide', function(){
                    var value = parseInt(this.get());
                    scope.repayment = value;
                    scope.$apply();
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
        }
    };
});
