moduleService.factory('Util', function($ionicLoading, $ionicPopup, $cordovaDatePicker){
	var self = this;
	
	self.getCurrentDateStringyyyyMMddHHmmss = function () {
	    
	    var dateVal = new Date();
	    var year = dateVal.getFullYear().toString();
	    var month = self.parseZero(dateVal.getMonth() + 1);
	    var day = self.parseZero(dateVal.getDate());
	    var hour = self.parseZero(dateVal.getHours());
	    var minutes = self.parseZero(dateVal.getMinutes());
	    var seconds = self.parseZero(dateVal.getSeconds());
	    
	    return year + month + day + hour + minutes + seconds;
	}
	
	self.parseZero = function (temp) {
	    return temp < 10 ? "0" + temp : temp.toString();
	}
	
	self.parseStringFromDateyyyyMMddHHmmss = function (str) {
	    var year = str.substring(0, 4);
	    var month = str.substring(4, 6);
	    var day = str.substring(6, 8);
	    var hour = str.substring(8, 10);
	    var minutes = str.substring(10, 12);
	    var seconds = str.substring(12, 14);
	    
	    var date = new Date(year, month, day, hour, minutes, seconds, 00);
	    date.setMonth(date.getMonth() - 1);

	    return date;
	}
	
	self.parseStringFromDateyyyyMMdd = function (str) {
	    var year = str.substring(0, 4);
	    var month = str.substring(4, 6);
	    var day = str.substring(6, 8);
	    var hour = 23
	    var minutes = 59;
	    var seconds = 59;
	    
	    var date = new Date(year, month, day, hour, minutes, seconds, 00);
	    date.setMonth(date.getMonth() - 1);

	    return date;
	}
	
	self.dayCalcNoon = function(date, day){
		var newDate = new Date();
		newDate.setTime(date.getTime());
		newDate.setDate(date.getDate() + day);
		newDate.setHours(12);
		newDate.setMinutes(00);
		newDate.setSeconds(00);
		newDate.setMilliseconds(00);
		return newDate;
	}
	
	self.dayAddictionyyyyMMddHHmmss = function (str) {
	    
	    var dateVal = new Date();
	    dateVal.setDate(dateVal.getDate() + str);
	    
	    var year = dateVal.getFullYear().toString();
	    var month = self.parseZero(dateVal.getMonth() + 1);
	    var day = self.parseZero(dateVal.getDate());
	    var hour = self.parseZero(dateVal.getHours());
	    var minutes = self.parseZero(dateVal.getMinutes());
	    var seconds = self.parseZero(dateVal.getSeconds());

	    return year + month + day + hour + minutes + seconds;
	}
	
	self.parseDateFromStringyyyyMMdd = function (dateVal) {
	    var year = dateVal.getFullYear().toString();
	    var month = self.parseZero(dateVal.getMonth() + 1);
	    var day = self.parseZero(dateVal.getDate());
	    var hour = self.parseZero(11);
	    var minutes = self.parseZero(59);
	    var seconds = self.parseZero(59);

	    return year + month + day + hour + minutes + seconds;
	}
	
	self.showAlert = function(title, template, buttons, scope){
		var alert = $ionicPopup.show({
	        title: title,
	        scope: scope,
	        template: template,
	        buttons:buttons
	    });
		
		return alert;
	}
	
	self.showLoading = function(){
		$ionicLoading.show({
			content: '<i class=" ion-loading-c"></i>',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
	}
	
	self.hideLoading = function(){
		$ionicLoading.hide();
	}
	
	self.showDatePicker = function(options){
		var picker;
		try{
			picker = $cordovaDatePicker.show(options);
		}catch (e) {
			console.log(e.message);
		}
		return picker;
	}
	
	self.specialCharRemove = function(str){
		var val = str;
		var pattern = /[^(가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9)]/gi; 
		if(pattern.test(val)){ 
			val = val.replace(pattern, ""); 
		}
		return val;
	}
	
	return self;
});