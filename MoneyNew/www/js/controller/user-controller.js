moduleCtrl.controller('UserCtrl', function($scope, $stateParams, Service, Util, $ionicHistory) {
	Service.getUserSumMoney([$stateParams.userSeq, $stateParams.userSeq, $stateParams.userSeq, $stateParams.userSeq, $stateParams.userSeq]).then(function(result){
		$scope.data = result;
	});
	Service.getUserMoney([$stateParams.userSeq]).then(function(result){
		for (var i = 0; i < result.length; i++) {
			result[i].parseStartDate = Util.parseStringFromDateyyyyMMddHHmmss(result[i].startDate);
            if (result[i].endDate) {
            	result[i].isEndDate = true;
                result[i].parseEndDate = Util.parseStringFromDateyyyyMMddHHmmss(result[i].endDate);
            } 
            result[i].moneyTypeStr = '꾼 돈';
            if(result[i].type == 'B'){
            	result[i].moneyTypeStr = '꿔준 돈';
            }
		}
		
		$scope.list = result;
	});
	
	$scope.goBack = function () {
		console.log($ionicHistory);
        $ionicHistory.goBack();
    }
});