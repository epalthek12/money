moduleService.factory('Push', function($cordovaLocalNotification, Util){
	var self = this;
	
	self.registerPush = function(data){
		try {
//			var pushDateOne = Util.dayCalcNoon(data.endDate, -1);
//			var pushDateThree = Util.dayCalcNoon(data.endDate, -3);
//			var pushDateWeek = Util.dayCalcNoon(data.endDate, -7);

			var newDate = new Date();
			var date = new Date(newDate.getTime() + 10 * 1000);
			
			
			console.log('nawDate : ' + newDate.getTime());
			console.log('date : ' + date.getTime());
			console.log('data : ' + JSON.stringify(data));
			
//			newDate.setTime(data.endDate.getTime());
//			newDate.setHours(09);
//			newDate.setMinutes(30);
//			newDate.setSeconds(00);
//			newDate.setMilliseconds(00);

//			var now = new Date();

//			var props = [];

			var prop = {
					id:data.pushKey,
					title:"Money",
					text:data.name + " " + data.money,
					at:date
			};

//			if(pushDateOne.getTime() > now.getTime()){
//			props.push({
//			id:data.seq + 100000,
//			title:"Money",
//			text:data.name + " " + data.money,
//			at:pushDateOne
//			});
//			}
//			if(pushDateThree.getTime() > now.getTime()){
//			props.push({
//			id:data.seq + 300000,
//			title:"Money",
//			text:data.name + " " + data.money,
//			at:pushDateThree
//			});
//			}
//			if(pushDateWeek.getTime() > now.getTime()){
//			props.push({
//			id:data.seq + 700000,
//			title:"Money",
//			text:data.name + " " + data.money,
//			at:pushDateWeek
//			});
//			}


			$cordovaLocalNotification.schedule(prop).then(function(result){
				console.log('registerPush : ' + result);
			});
		} catch (e) {
			console.log(e.message);
		}
	}
	
	self.unRegisterPush = function(pushKey){
		$cordovaLocalNotification.cancel(pushKey).then(function (result) {
			console.log(result);
		});
		$cordovaLocalNotification.cancel(pushKey).then(function (result) {
			console.log(result);
		});
		$cordovaLocalNotification.cancel(pushKey).then(function (result) {
			console.log(result);
		});
	}
	return self;
});