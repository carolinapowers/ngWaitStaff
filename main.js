angular.module('WaitApp', ['ngMessages', 'ngRoute', 'ngAnimate'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
                templateUrl: './home.html'
            })
            .when('/meals', {
                templateUrl: './meal/new-meal.html',
                controller: 'CalculatorCtrl'
            })
            .when('/earnings', {
                templateUrl: './earnings/my-earnings.html',
                controller: 'MyEarningsCtrl'
            })
            .otherwise('/');
    }])
    .controller('CalculatorCtrl', function ($scope, $rootScope) {

        var tipTotal = [];
        var mealCount = [];

        $scope.mealDetails = {
            mealPrice: 0,
            taxRate: 0,
            tipPercentage: 0
        }

        $scope.submit = function () {
            angular.extend($scope, calcCustomerCharges($scope.mealPrice, $scope.tipPercentage, $scope.taxRate));
            calcMyEarnings();
        }

        function calcCustomerCharges(mealPrice, tipPercentage, taxRate) {
            var subTotal = $scope.mealPrice + ($scope.mealPrice * ($scope.taxRate * .01));
            var tip = subTotal * ($scope.tipPercentage * 0.01);
            var total = subTotal + tip;

            return {
                subTotal: subTotal,
                tip: tip,
                total: total
            }
        };

        function calcMyEarnings() {
            if ($scope.mealPrice !== 0 && $scope.tip !== 0) {
                tipTotal.push($scope.tip);
                var total = 0;
                for (var i in tipTotal) {
                    total += tipTotal[i]
                }
                mealCount.push($scope.mealDetails.mealPrice);
                $rootScope.totalTip = total;
                $rootScope.totalMeal = mealCount.length;
                $rootScope.averageTip = $scope.totalTip / $scope.totalMeal;
            } else {
                alert('We do not take 0s');
            }
        }

        $rootScope.reset = function () {
            $rootScope.mealPrice = 0;
            $rootScope.taxRate = 0;
            $rootScope.tipPercentage = 0;
            $rootScope.subTotal = 0;
            $rootScope.tip = 0;
            $rootScope.total = 0;
            $rootScope.tipTotal = [];
            $rootScope.mealCount = [];
            $rootScope.totalTip = 0;
            $rootScope.totalMeal = 0;
            $rootScope.averageTip = 0;
        }

        $scope.cancel = function () {
            $scope.mealPrice = 0;
            $scope.taxRate = 0;
            $scope.tipPercentage = 0;
        }


    });