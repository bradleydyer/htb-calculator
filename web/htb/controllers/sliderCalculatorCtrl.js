'use strict';
/**
 * Slider Calculator Controller
 *
 * @author Kris Rybak <kris.rybak@bradleydyer.com>
 */
htb.controller('SliderCalculatorCtrl', function ($scope) {
    $scope.maxTotal         = 600000;
    $scope.interestRate     = 6.5;
    $scope.mortgageLenght   = 30;
    $scope.repayment        = 0;
    $scope.minRepayment     = 0;
    $scope.maxRepayment     = 0;
    $scope.deposit          = 15000;
    $scope.equityLoan       = 0;
    $scope.principal        = 0;

    $scope.getDepositAsPercentage = function() {
        return parseFloat(($scope.deposit * 100 / ($scope.deposit + $scope.equityLoan + $scope.principal)).toFixed(1));
    }

    $scope.setEquityLoan = function(deposit, principlal) {
        if (($scope.deposit + $scope.equityLoan + $scope.principal) > $scope.maxTotal) {
            $scope.equityLoan = $scope.maxTotal * 40 / 100;
        } else {
            $scope.equityLoan = parseInt((deposit + principlal) * 40 / 60);
        }
    }

    $scope.getEquityLoanAsPercentage = function() {
        return parseFloat(($scope.equityLoan * 100 / ($scope.deposit + $scope.equityLoan + $scope.principal)).toFixed(1));
    }

    $scope.setPrincipal = function() {
        var principal = parseInt($scope.repayment * (1-Math.pow(1+$scope.calculateMonthlyInterestRate($scope.interestRate),-$scope.calculateMortgageLenghtInMonths($scope.mortgageLenght))) / $scope.calculateMonthlyInterestRate($scope.interestRate));

        if (($scope.deposit + $scope.equityLoan + principal) <= $scope.maxTotal) {
            $scope.principal = principal;        
        } else {
            $scope.repayment = $scope.findRepaymentForMaxPrincipal();
            $scope.maxRepayment = $scope.repayment;
        }
    }

    $scope.findRepaymentForMaxPrincipal = function() {
        var maxPrincipal = $scope.maxTotal - $scope.deposit - $scope.equityLoan;
        var r = $scope.calculateMonthlyInterestRate($scope.interestRate)
        var P = maxPrincipal;
        var N = $scope.calculateMortgageLenghtInMonths($scope.mortgageLenght);

        return parseInt((r/(1-Math.pow(1+r,-N))) * P);
    }

    $scope.calculateMonthlyInterestRate = function(interestRate) {
        return interestRate / 100 / 12;
    }

    $scope.calculateMortgageLenghtInMonths = function(mortgageLenght) {
        return mortgageLenght * 12;
    }

    $scope.getPrincipalAsPercentage = function() {
        return parseFloat(($scope.principal * 100 / ($scope.deposit + $scope.equityLoan + $scope.principal)).toFixed(1));
    }

    $scope.init = function() {
        $scope.calculateMinRepayment($scope.interestRate, $scope.deposit, $scope.mortgageLenght);

        $scope.calculateMaxRepayment($scope.interestRate, $scope.deposit, $scope.mortgageLenght);

        $scope.calculateRepayment($scope.minRepayment, $scope.maxRepayment);

        $scope.setPrincipal();
    }

    $scope.calculateRepayment = function(minRepayment, maxRepayment) {

        $scope.repayment = parseInt((minRepayment + maxRepayment) / 2);
    }

    $scope.calculateMaxRepayment = function(interestRate, deposit, mortgageLenght) {
        var r = $scope.calculateMonthlyInterestRate(interestRate)
        var P = deposit * 55 / 5;
        var N = $scope.calculateMortgageLenghtInMonths(mortgageLenght);

        $scope.maxRepayment = parseInt((r/(1-Math.pow(1+r,-N))) * P);
    }

    $scope.calculateMinRepayment = function(interestRate, deposit, mortgageLenght) {
        var r = $scope.calculateMonthlyInterestRate(interestRate)
        var P = deposit * 37.5 / 22.5;
        var N = $scope.calculateMortgageLenghtInMonths(mortgageLenght);

        $scope.minRepayment = parseInt((r/(1-Math.pow(1+r,-N))) * P);
    }

    $scope.getTotalWithHelpToBuy = function() {
        return $scope.deposit + $scope.equityLoan + $scope.principal;
    }

    $scope.getTotalWithoutHelpToBuy = function() {
        return $scope.deposit + $scope.principal;
    }

    $scope.init();

    $scope.$watch('deposit', function(newValue) {
        $scope.setEquityLoan(newValue, $scope.principal);
        $scope.setPrincipal();
    });

    $scope.$watch('interestRate', function(newValue) {
        $scope.setPrincipal();
        $scope.setEquityLoan($scope.deposit, $scope.principal);
    });

    $scope.$watch('mortgageLenght', function(newValue) {
        $scope.setPrincipal();
        $scope.setEquityLoan($scope.deposit, $scope.principal);
    });

    $scope.$watch('repayment', function(newValue) {
        $scope.setPrincipal();
    });
})
