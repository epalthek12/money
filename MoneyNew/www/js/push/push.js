moduleService.factory('Push', function($cordovaLocalNotification){
	var self = this;
	
	self.registerPush = function(prop){
		ionic.Platform.ready(function(){
			try {
				$cordovaLocalNotification.schedule(prop).then(function(result){
					console.log(result);
				});
			} catch (e) {
				console.log(e.message);
			}
		})
	}
	return self;
});