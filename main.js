angular.module('WaitApp', ['ngMessages', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', {
            templateUrl:'./home.html'
        })
        .when('/meals', {
            templateUrl:'./meal/new-meal.html'
        })
        .when('/earnings', {
            templateUrl:'./earnings/my-earnings.html'
        })
        .otherwise('/');
    }])
    .controller('CalculatorCtrl', function ($scope) {
       
        var tipTotal = [];
        var mealCount = [];

        $scope.mealDetails = {
            mealPrice: 0,
            taxRate: 0,
            tipPercentage: 0
        }

        $scope.submit = function () {
            //set an object based on user input
            $scope.mealDetails = {
                mealPrice: $scope.mealPrice,
                taxRate: $scope.taxRate,
                tipPercentage: $scope.tipPercentage
            }

            angular.extend($scope, calcCustomerCharges($scope.mealPrice, $scope.tipPercentage,  $scope.taxRate));
            
            angular.extend($scope, calcMyEarnings());
            
            $scope.cancel();
        }
          
    function calcCustomerCharges(mealPrice, tipPercentage, taxRate){
        var subTotal =  $scope.mealPrice + ($scope.mealPrice * ($scope.taxRate * .01));
        var tip = subTotal * ($scope.tipPercentage * 0.01);
        var total = subTotal + tip;

        return {
            subTotal: subTotal,
            tip: tip,
            total: total
        }
   };
       
    function calcMyEarnings () {       
            tipTotal.push($scope.tip); 
            var total = 0;
            for (var i in tipTotal) {
                total += tipTotal[i]
            } 
            mealCount.push($scope.mealDetails.mealPrice);
           
           $scope.totalTip = total;  
           $scope.totalMeal = mealCount.length;
           $scope.averageTip = $scope.totalTip / $scope.totalMeal;
           
           return {
               totalTip: $scope.totalTip,
               totalMeal: $scope.totalMeal,
               averageTip: $scope.averageTip       
           }
       }   

        $scope.reset = function () {
            $scope.mealPrice = 0;
            $scope.taxRate = 0;
            $scope.tipPercentage = 0;
            $scope.subTotal = 0;
            $scope.tip = 0;
            $scope.total = 0;
            $scope.tipTotal = [];
            $scope.mealCount = [];
            $scope.totalTip = 0;
            $scope.totalMeal = 0;
            $scope.averageTip = 0;
        }

        $scope.cancel = function () {
            $scope.mealPrice = 0;
            $scope.taxRate = 0;
            $scope.tipPercentage = 0;
        }
       
        
    });