angular.module('WaitApp', ['ngMessages'])
    .controller('CalculatorCtrl', function ($scope) {
        $scope.subTotal = undefined;
        $scope.tip = undefined;
        $scope.tipTotal = [];
        $scope.mealCount = [];

        $scope.mealDetails = {
            mealPrice: undefined,
            taxRate: undefined,
            tipPercentage: undefined
        }

        $scope.submit = function () {
            //set an object based on user input
            $scope.mealDetails = {
                mealPrice: $scope.mealPrice,
                taxRate: $scope.taxRate,
                tipPercentage: $scope.tipPercentage
            }

            //calculate Costumer Charges
            $scope.subTotal = $scope.mealDetails.mealPrice + ($scope.mealDetails.mealPrice * ($scope.mealDetails.taxRate * .01));
            $scope.tip = $scope.subTotal * ($scope.mealDetails.tipPercentage * 0.01);
            $scope.total = $scope.subTotal + $scope.tip;

            //add tips to an array
            $scope.tipTotal.push($scope.tip);
            // sum the tips in the array
            var total = 0;
            for (var i in $scope.tipTotal) {
                total += $scope.tipTotal[i]
            }
            //display sum of tips in the array
            $scope.totalTip = total;

            //add meals to an array, then find the number of meals by finding array.length
            $scope.mealCount.push($scope.mealDetails.mealPrice);
            $scope.totalMeal = $scope.mealCount.length;

            //avarage tip per meal is equal total tip divided by number of meals
            $scope.averageTip = $scope.totalTip / $scope.totalMeal;
        }

        $scope.reset = function () {
            $scope.mealPrice = "";
            $scope.taxRate = "";
            $scope.tipPercentage = "";
            $scope.subTotal = "";
            $scope.tip = "";
            $scope.total = "";
            $scope.tipTotal = [];
            $scope.mealCount = [];
            $scope.totalTip = "";
            $scope.totalMeal = "";
            $scope.averageTip = "";
        }

        $scope.cancel = function () {
            $scope.mealPrice = "";
            $scope.taxRate = "";
            $scope.tipPercentage = "";
        }

        //        $scope.cancel = function () {
        //            $scope.copia = angular.copy($scope.mealDetails);
        //            $scope.reset = function () {
        //                $scope.copia = angular.copy($scope.mealDetails);
        //                // or
        //                // angular.copy($scope.initial, $scope.datas);
        //            }
        //        };
    });