moduleCtrl.controller('ContactCtrl', function ($scope, $cordovaContacts, Util) {
    $scope.contact = {};
    Util.showLoading();
    $cordovaContacts.find({filter : '', multiple:true, hasPhoneNumber:true}).then(function (contacts) {
    	for (var i = 0; i < contacts.length; i++) {
			if(contacts[i].phoneNumbers){
				contacts[i].formatPhoneNum = Util.specialCharRemove(contacts[i].phoneNumbers[0].value);
			}
		}
    	
        $scope.contacts = contacts;
        Util.hideLoading();
    });
})