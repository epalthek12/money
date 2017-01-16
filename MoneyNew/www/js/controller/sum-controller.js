var moduleCtrl = angular.module('starter.controllers', []);

moduleCtrl.controller('SumCtrl', function($scope, Service, Util, $ionicHistory) {
	$ionicHistory.clearHistory();
	
	$scope.badge = {};
	$scope.badge.cnt = 5;
	
	//A : 꾼돈, B : 꿔준 돈
	Service.getSumMoney(['A']).then(function (result) {
		$scope.borrowAllMoney = result.allMoney;
		$scope.borrowAllRepayment = result.allRepayment;
		$scope.borrowAllsum = result.allMoney - result.allRepayment;
	});
	Service.getSumMoney(['B']).then(function (result) {
		$scope.lentAllMoney = result.allMoney;
		$scope.lentAllRepayment = result.allRepayment;
		$scope.lentAllsum = result.allMoney - result.allRepayment;
	});

	//상환 일정
	$scope.borrowSchedule = {};
	Service.getSchedule(['A', Util.dayAddictionyyyyMMddHHmmss(3)])
	.then(function (result) {
		$scope.borrowScheduleFlag = result ? true : false;
		if (result) {
			result.startDate = Util.parseStringFromDateyyyyMMddHHmmss(result.startDate);
			result.endDate = Util.parseStringFromDateyyyyMMddHHmmss(result.endDate);
			$scope.borrowSchedule = result;
		}
	});

	$scope.lentSchedule = {};
	Service.getSchedule(['B', Util.dayAddictionyyyyMMddHHmmss(3)])
	.then(function (result) {
		$scope.lentScheduleFlag = result ? true : false;
		if (result) {
			result.startDate = Util.parseStringFromDateyyyyMMddHHmmss(result.startDate);
			result.endDate = Util.parseStringFromDateyyyyMMddHHmmss(result.endDate);
			$scope.lentSchedule = result;
		}
	});
});