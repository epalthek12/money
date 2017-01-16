moduleService.factory('DBA', function($q, $cordovaSQLite, $ionicPlatform, Util){
	var helper = new SqliteHelper();
	var db = helper.getDB();
	var self = this;
	
	self.excuteSql = function(query, param){
		param = param || [];
		var defer = $q.defer();

		$ionicPlatform.ready(function () {
			Util.showLoading();
			$cordovaSQLite.execute(db, query, param).then(function (result) {
				Util.hideLoading();
				defer.resolve(result);
			}, function (error) {
				Util.hideLoading();
				console.log('DB Error : ' + error.message);
				defer.reject(error);
			});
		});
		return defer.promise;
	}
	
	self.multipleExcuteSql = function(querys, params){
		var promises = [];
		var defer = $q.defer();
		for (var i = 0; i < querys.length; i++) {
			promises.push(self.excuteSql(querys[i], params[i]));
		}
		$q.all(promises).then(defer.resolve, defer.reject);
        return q.promise;
	}
	
	self.getAll = function (result) {
        var output = [];
        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        return output;
    }
	
	self.getOne = function (result) {
        var output = null;
        if(result.rows.length > 0){
        	output = angular.copy(result.rows.item(0));
        }
        return output;
    }
	
	return self;
});