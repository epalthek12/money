moduleService.factory('Push', function($cordovaLocalNotification, Util){
	var self = this;
	
	self.registerPush = function(data){
		ionic.Platform.ready(function(){
			try {
				var pushDateOne = Util.dayCalcNoon(data.endDate, -1);
				var pushDateThree = Util.dayCalcNoon(data.endDate, -3);
				var pushDateWeek = Util.dayCalcNoon(data.endDate, -7);
				
				var now = new Date();
				
				var props = [];
				
				if(pushDateOne.getTime() > now.getTime()){
					props.push({
						id:data.seq + 100000,
						title:"Money",
						text:data.name + " " + data.money,
						at:pushDateOne
					});
				}
				if(pushDateThree.getTime() > now.getTime()){
					props.push({
						id:data.seq + 300000,
						title:"Money",
						text:data.name + " " + data.money,
						at:pushDateThree
					});
				}
				if(pushDateWeek.getTime() > now.getTime()){
					props.push({
						id:data.seq + 700000,
						title:"Money",
						text:data.name + " " + data.money,
						at:pushDateWeek
					});
				}
				
				
				$cordovaLocalNotification.schedule(props).then(function(result){
					console.log(result);
				});
			} catch (e) {
				console.log(e.message);
			}
		})
	}
	
	self.unRegisterPush = function(seq){
		$cordovaLocalNotification.cancel(seq + 100000).then(function (result) {
			console.log(result);
		});
		$cordovaLocalNotification.cancel(seq + 300000).then(function (result) {
			console.log(result);
		});
		$cordovaLocalNotification.cancel(seq + 700000).then(function (result) {
			console.log(result);
		});
	}
	return self;
});