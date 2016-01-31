angular.module('WaitApp')

    .controller('MyEarningsCtrl', function ($scope, $rootScope) {
    
    console.log($rootScope);
    
           $scope.totalTip = $rootScope.totalTip; 
           $scope.totalMeal = $rootScope.totalMeal;
           $scope.averageTip = $rootScope.averageTip;    
    
           $scope.reset = $rootScope.reset;
});