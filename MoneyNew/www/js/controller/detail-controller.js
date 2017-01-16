moduleCtrl.controller('DetailCtrl', function ($scope, $stateParams, $location, Service, $state, $ionicHistory, $cordovaSms, $ionicPlatform, Util, Push) {
	
	init();
	
    if ($stateParams.seq) {

    	Service.get([$stateParams.seq]).then(function (result) {
            result.startDate = Util.parseStringFromDateyyyyMMddHHmmss(result.startDate);
            if (result.endDate) {
            	result.isEndDate = true;
                result.endDate = Util.parseStringFromDateyyyyMMddHHmmss(result.endDate);
            } 
            $scope.data = result;
        });
    	Service.getRepayMent([$stateParams.seq]).then(function (result) {
            for (var i = 0; i < result.length; i++) {
                result[i].parseRegisterDate = Util.parseStringFromDateyyyyMMddHHmmss(result[i].registerDate);
            }
            $scope.repayments = result;
        });
    }

    $scope.ledgerDelete = function () {
    	
    	var onTap = function(e){
    		if (!$scope.data.seq) {
				e.preventDefault();
			} else {
				return $scope.data.seq;
			}
    	};
    	var buttons = [{text:'예', type:'button-positive', onTap:onTap}, {text:'아니오'}];
    	var alert = Util.showAlert('삭제 하시겠습니까?', null, buttons);
    	
    	alert.then(function(res){
    		if(res){
				Push.unRegisterPush(res);
    			Service.deleteRepaymentAll([res]);
    			Service.deleteLedger([res]);
    			$ionicHistory.goBack();
    		}
    	});
    }

    $scope.repaymentDelete = function (seq) {
    	
    	var onTap = function(e){
    		return seq;
    	};
    	var buttons = [{text:'예', type:'button-positive', onTap:onTap}, {text:'아니오'}];
    	var alert = Util.showAlert('삭제 하시겠습니까?', null, buttons);
    	
    	alert.then(function(res){
    		if(res){
    			if($scope.data.alramYn == 'Y'){
    				Push.unRegisterPush($scope.data.seq);
        			Push.registerPush($scope.data);
    			}
    			Service.deleteRepayment([res]);
    			Service.updateComplete(['N', $scope.data.seq]);
    			$state.go($state.current, {}, {
    				reload: true
    			});
    		}
    	});
    }

    $scope.repaymentAdd = function () {
    	$scope.addRepay = {};
    	var onTap = function(e){
    		if (!$scope.addRepay.money) {
                e.preventDefault();
            } else {
                return $scope.addRepay;
            }
    	};
    	var buttons = [{text:'저장', type:'button-positive', onTap:onTap}, {text:'취소'}];
    	var template = '<input type="text" ng-model="addRepay.money">';
    	var alert = Util.showAlert('금액', template, buttons, $scope);
    	
    	alert.then(function(res){
    		if(res){
				if($scope.data.sumMoney < res.money){
					Util.showAlert('남은 금액을 초과했습니다. 다시 입력해 주세요.', null, [{text:'확인', type:'button-positive'}]);
					return;
				}else if($scope.data.sumMoney == res.money){
					Push.unRegisterPush($scope.data.seq);
					Service.updateComplete(['Y', $scope.data.seq]);
				}
    			Service.insertRepayment([null, $scope.data.seq, res.money, Util.getCurrentDateStringyyyyMMddHHmmss()]);
    			$state.go($state.current, {}, {
    				reload: true
    			});
    		}
    	});
    }
    
    $scope.sendSMS = function(){
    	$ionicPlatform.ready(function () {
    		var options = {
    				replaceLineBreaks:false,
    				anroid:{
    					intent:'INTENT'
    				}
    		};
    		var msg = $scope.data.name + ' 남은 돈 : ' + $scope.data.sumMoney  
    		var sms = $cordovaSms.send($scope.data.phoneNum, msg, options);
    		sms.then(function(){
    			console.log('Success! SMS was sent');
    		}, function(error){
    			console.log(error);
    		});
    	});
    }

    $scope.go = function (path) {
        $location.path(path);
    }

    $scope.goBack = function () {
        $ionicHistory.goBack();
    }
    
    function init(){
    	$scope.subject = {};
    	switch ($stateParams.type) {
		case 'A':
			$scope.subject.moneyTypeStr = "꾼 돈";
			$scope.subject.repayTypeStr = "돈 갚기";
			break;
		case 'B':
			$scope.subject.moneyTypeStr = "꿔준 돈";
			$scope.subject.repayTypeStr = "돈 받기";
			break;
		}
    }
})