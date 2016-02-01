angular.module('WaitApp')

    .controller('MyEarningsCtrl', function ($scope, $rootScope) {
    
    console.log($rootScope);
    
           $scope.totalTip = $rootScope.totalTip; 
           $scope.totalMeal = $rootScope.totalMeal;
           $scope.averageTip = $rootScope.averageTip;    
    
           $scope.reset = function () { $rootScope.reset();
                                       $scope.totalTip = 0; 
           $scope.totalMeal = 0;
           $scope.averageTip = 0;     }
});