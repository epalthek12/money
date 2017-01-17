moduleCtrl.controller('RegisterCtrl', function ($scope, Service, $stateParams, Util, $location, $ionicHistory, $ionicModal) {
	
	init();
	setContactView();
	
    $scope.showDatePicker = function (type) {
    	
    	var options = {
    			date: new Date(),
    			mode: 'date',
    			doneButtonLabel: 'DONE',
    			doneButtonColor: '#356FDD',
    			cancelButtonLabel: 'CANCEL',
    			cancelButtonColor: '#000000'
    	};
    	
    	var picker = Util.showDatePicker(options);
    	try {
    		picker.then(function(date){
    			if(date){
    				if (type == 'A') {
        				$scope.data.startDate = date;
        			} else {
        				$scope.data.endDate = date;
        			}
    			}
    			
    		});
		} catch (e) {
			console.log(e.message);
		}
    };

    $scope.endDateCheck = function () {
    	$scope.isEndDate = $scope.data.checked;
    	if($scope.data.checked){
    		$scope.data.endDate = new Date();
    	}else{
    		$scope.data.endDate = null;
    	}
    };

    $scope.contact = function () {
        $scope.modal.show();
    };
    
    $scope.onSelected = function (info) {
    	
    	$scope.data.name = info.name.formatted;
    	if(info.phoneNumbers){
    		$scope.data.phoneNum = info.formatPhoneNum;
    	}
    	$scope.modal.hide();
    };
    
    $scope.modalClose = function(){
    	$scope.modal.hide();
    }
    
    $scope.goBack = function () {
        $ionicHistory.goBack();
    };
    
    if($stateParams.seq){
    	//상세
    	Service.get([$stateParams.seq]).then(function (data) {
    		$scope.data = data;
    		$scope.isEndDate = data.endDate ? true : false;
    		data.checked = data.endDate ? true : false;
    		data.startDate = Util.parseStringFromDateyyyyMMddHHmmss(data.startDate);
    		if (data.endDate) {
    			data.endDate = Util.parseStringFromDateyyyyMMddHHmmss(data.endDate);
    		} 
    	});
    }
    
    function init(){
    	$scope.isEndDate = false;
    	// form 데이타 초기화
    	$scope.data = {
    			seq: '',
    			type: $stateParams.type,
    			name: '',
    			phoneNum: '',
    			startDate: new Date(),
    			endDate: '',
    			completeYn: 'N',
    			alramYn: 'N',
    			money: '',
    			note: ''
    	};
    }
    
    function setContactView(){
    	$ionicModal.fromTemplateUrl('templates/contact.html', {
    		scope: $scope,
    		animation: 'slide-in-up'
    	}).then(function(modal) {
    		console.log(modal);
    		$scope.modal = modal;
    	});
    }
});

moduleCtrl.controller('RegisterFormCtrl', function ($scope, Service, $ionicHistory, Util, Push) {
	
	$scope.execute = function(){
		var data = $scope.data;
		if(!data.seq){
			//추가
			if(data.phoneNum){
				Service.getUserCnt([data.phoneNum]).then(function(result){
					if(result.count <= 0){
						var insertId = Service.insertUser([null, data.name, data.phoneNum]);
					}
					Service.getUserSeq([data.phoneNum]).then(function(result){
						data.userSeq = result.seq;
						insertLedger(data);
					});
				});
			}else{
				insertLedger(data);
			}
		}else{
			//수정
			if(data.startDate){
				data.startDate = Util.parseDateFromStringyyyyMMdd(data.startDate);
			}
			if(data.endDate){
				if(data.alramYn == 'Y'){
					data.pushKey = Util.parseDateFromStringyyyyMMdd(data.endDate);
					Push.unRegisterPush(data.pushKey);
					Push.registerPush(data);
				}
				data.endDate = Util.parseDateFromStringyyyyMMdd(data.endDate);
			}
			var param = [data.money, data.startDate, data.endDate, data.alramYn, data.note, data.seq];
			var updateId = Service.updateLedger(param);
	    	var buttons = [{text:'확인', type:'button-positive'}];
	    	var alert = Util.showAlert('수정 되었습니다.', null, buttons);
	    	
	    	alert.then(function(res){
	    		$ionicHistory.goBack();
	    	});
		}
	}
	
	
	function insertLedger(data){
		if(data.startDate){
			data.startDate = Util.parseDateFromStringyyyyMMdd(data.startDate);
		}
		if(data.endDate){
			if(data.alramYn == 'Y'){
				data.pushKey = Util.parseDateFromStringyyyyMMdd(data.endDate);
				Push.registerPush(data);
			}
			data.endDate = Util.parseDateFromStringyyyyMMdd(data.endDate);
		}
		var param = [null, data.userSeq, data.type, data.money, data.startDate, data.endDate, 'N', data.alramYn, data.note];
		//데이타 입력
		var insertId = Service.insertLedger(param);
		var buttons = [{text:'확인', type:'button-positive'}];
		var alert = Util.showAlert('입력 되었습니다.', null, buttons);

		alert.then(function(res){
			$ionicHistory.goBack();
		});
	}
	
});

