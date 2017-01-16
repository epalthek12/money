moduleCtrl.controller('LendTabCtrl', function($scope, Service, Util) {
	$scope.badge = {};
	Service.getScheduleCnt(['B', Util.dayAddictionyyyyMMddHHmmss(3)]).then(function(result){
		$scope.badge.cnt = result.cnt;
	});
});

moduleCtrl.controller('LendCtrl', function($scope, $location, Service, Util, $ionicHistory) {
	$ionicHistory.clearHistory();
	//'B'타입의 데이타를 가져온다.
	$scope.sort = '1';
	getData($scope.sort);
	
	$scope.orderBy = function(sort){
		getData(sort);
	}
	
	$scope.go = function (path) {
	    $location.path(path);
	};
	
	function getData(sort){
		switch (sort) {
		case '0':
			sort = "(CASE WHEN (A.end_date IS NULL OR A.end_date = '') THEN 1 ELSE 0 END), end_date";
			break;
		case '1':
			sort = "complete_yn,(CASE WHEN (A.end_date IS NULL OR A.end_date = '') THEN 1 ELSE 0 END), end_date";
			break;
		case '2':
			sort = "name";
			break;
		}
		Service.all(['B'], sort).then(function (result) {
	        for (var i = 0; i < result.length; i++) {
	            result[i].parseStartDate = Util.parseStringFromDateyyyyMMddHHmmss(result[i].startDate);
	            if (result[i].endDate) {
	            	result[i].isEndDate = true;
	                result[i].parseEndDate = Util.parseStringFromDateyyyyMMddHHmmss(result[i].endDate);
	            }
	            if(result[i].sumMoney <= 0){
	            	result[i].isComplete = true;
	            	result[i].backColor = 'bg-complete';
	            }
	        }
	        $scope.list = result;
	    });
	}
	
	
});