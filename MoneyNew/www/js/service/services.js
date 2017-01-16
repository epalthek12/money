var moduleService = angular.module('starter.services', []);

moduleService.factory('Service', function(DBA){
	var self = this;
	self.getSumMoney = function(param){
        var query = 
        	"SELECT " +
        		"IFNULL(SUM(A.money), 0) AS allMoney" +
        		", IFNULL(SUM(B.repayment), 0) AS allRepayment " +
        	"FROM ledger A " +
        	"LEFT JOIN repayment B " +
        		"ON B.ledger_seq=A.seq " +
        	"WHERE A.type=?";
        
        return DBA.excuteSql(query, param).then(function(result){
        	return DBA.getOne(result);
        });
    }
	
	self.getSchedule = function(param){
		var query = 
			"SELECT " +
				"A.seq, " +
				"A.start_date AS startDate, " +
				"A.end_date AS endDate, " +
				"A.money, " +
				"B.name " +
			"FROM ledger A " +
				"JOIN user B " +
					"ON A.user_seq=B.seq " +
			"WHERE A.type=? " +
				"AND A.end_date < ? " +
				"AND A.complete_yn='N'"
			"ORDER BY A.end_date " +
			"LIMIT 1";
		
		return DBA.excuteSql(query, param).then(function(result){
        	return DBA.getOne(result);
        });
	}
	
	self.getDetail = function(param){
        var query = 
        	"SELECT " +
        		"A.seq, " +
        		"A.user_seq AS userSeq, " +
        		"A.type, " +
        		"A.money, " +
        		"A.start_date AS startDate, " +
        		"A.end_date AS endDate, " +
        		"A.complete_yn AS completeYn, " +
        		"A.alram_yn AS alramYn, " +
        		"A.note, " +
        		"B.name, " +
        		"B.phone_num AS phoneNum, " +
        		"IFNULL(" +
    				"A.money-" +
    					"(" +
    					"SELECT " +
    						"SUM(C.repayment) " +
    					"FROM repayment C " +
    					"WHERE C.ledger_seq=A.seq" +
    					")" +
    				", 0) AS sumMoney, " +
        		"IFNULL((" +
        			"SELECT " +
        				"SUM(D.repayment) " +
        			"FROM repayment D " +
        			"WHERE D.ledger_seq=A.seq" +
        				"), 0) AS repayment " +
        	"FROM ledger A " +
        		"LEFT JOIN user B " +
        			"ON A.user_seq=B.seq " +
        	"WHERE A.seq=?";
        
        return DBA.excuteSql(query, param).then(function(result){
        	return DBA.getOne(result);
        });
    }
	
	self.getUserCnt = function(param){
		console.log(param);
		var query = 
			"SELECT " +
				"COUNT(*) AS count " +
			"FROM " +
				"user " +
			"WHERE phone_num=?";
		return DBA.excuteSql(query, param).then(function(result){
        	return DBA.getOne(result);
		});
	}
	
	self.getUserSeq = function (param) {
        var query = 
        	"SELECT seq " +
        		"FROM user " +
        	"WHERE phone_num=?";

        return DBA.excuteSql(query, param).then(function (result) {
            return DBA.getOne(result);
        });
    }
	
	self.insertLedger = function(param){
        var query = 
        	"INSERT INTO ledger " +
        	"VALUES(?,?,?,?,?,?,?,?,?)";
        
        return DBA.excuteSql(query, param);
    }
	
	self.updateLedger = function (param) {
        var query = 
        	"UPDATE ledger " +
        	"SET " +
        		"money=?," +
        		"start_date=?," +
        		"end_date=?," +
        		"alram_yn=?," +
        		"note=? " +
        	"WHERE seq=?";

        return DBA.excuteSql(query, param);
    }
	
	self.insertUser = function (param) {
        var query = 
        	"INSERT INTO user " +
        	"VALUES(?,?,?)";
        return DBA.excuteSql(query, param);
    }
	
	self.all = function (param, orderBy) {
        var query = 
        	"SELECT " +
	        	"A.seq, " +
	    		"A.user_seq AS userSeq, " +
	    		"A.type, " +
	    		"A.money, " +
	    		"A.start_date AS startDate, " +
	    		"A.end_date AS endDate, " +
	    		"A.complete_yn AS completeYn, " +
	    		"A.alram_yn AS alramYn, " +
	    		"A.note, " +
        		"B.name, " +
        		"B.phone_num AS phoneNum, " +
        		"IFNULL(" +
        			"A.money-" +
        				"(" +
        				"SELECT " +
        					"IFNULL(SUM(C.repayment), 0) " +
        				"FROM repayment C " +
        				"WHERE C.ledger_seq=A.seq" +
        				")" +
        			", 0) AS sumMoney " +
        	"FROM ledger A " +
        		"LEFT JOIN user B " +
        			"ON A.user_seq=B.seq " +
        	"WHERE A.type=? " +
        	"ORDER BY " + orderBy;

        return DBA.excuteSql(query, param).then(function (result) {
            return DBA.getAll(result);
        });
    }
	
	self.get = function (param) {
        var query = 
        	"SELECT " +
	        	"A.seq, " +
	    		"A.user_seq AS userSeq, " +
	    		"A.type, " +
	    		"A.money, " +
	    		"A.start_date AS startDate, " +
	    		"A.end_date AS endDate, " +
	    		"A.complete_yn AS completeYn, " +
	    		"A.alram_yn AS alramYn, " +
	    		"A.note, " +
        		"B.name, " +
        		"B.phone_num AS phoneNum, " +
        		"IFNULL(" +
        			"A.money-" +
        				"(" +
        				"SELECT " +
        					"IFNULL(SUM(C.repayment), 0) " +
        				"FROM repayment C " +
        				"WHERE C.ledger_seq=A.seq" +
        				")" +
        		", 0) AS sumMoney, " +
        		"IFNULL(" +
        			"(" +
        			"SELECT " +
        				"IFNULL(SUM(D.repayment), 0) " +
        			"FROM repayment D " +
        			"WHERE D.ledger_seq=A.seq" +
        			")" +
        		", 0) AS repayment " +
        	"FROM ledger A " +
        		"LEFT JOIN user B " +
        			"ON A.user_seq=B.seq " +
        	"WHERE A.seq=?";

        return DBA.excuteSql(query, param).then(function (result) {
            return DBA.getOne(result);
        });
    }
	
	self.getRepayMent = function (param) {
        var query = 
        	"SELECT " +
        		"seq, " +
        		"ledger_seq AS ledgerSeq, " +
        		"repayment, " +
        		"register_date AS registerDate " +
        	"FROM repayment " +
        	"WHERE ledger_seq=? " +
        	"ORDER BY seq DESC";
        
        return DBA.excuteSql(query, param).then(function (result) {
            return DBA.getAll(result);
        });
    }
	
	self.insertRepayment = function(param){
        var query = 
        	"INSERT INTO repayment " +
        	"VALUES(?,?,?,?)";
        
        return DBA.excuteSql(query, param);
    }
	
	self.deleteLedger = function(param){
        var query = 
        	"DELETE " +
        	"FROM ledger " +
        	"WHERE seq=?";
        return DBA.excuteSql(query, param);
    }
	
	self.deleteRepayment = function(param){
        var query = 
        	"DELETE " +
        	"FROM repayment " +
        	"WHERE seq=?";
        return DBA.excuteSql(query, param);
    }
	
	self.updateComplete = function(param){
		var query = 
        	"UPDATE ledger " +
        	"SET " +
        		"complete_yn=? " +
        	"WHERE seq=?";
		return DBA.excuteSql(query, param);
	}
	
	self.deleteRepaymentAll = function(param){
		var query = 
			"DELETE " +
			"FROM repayment " +
			"WHERE ledger_seq=?";
		return DBA.excuteSql(query, param);
	}
	
	self.getUserMoney = function(param){
		var query = 
			"SELECT " +
				"A.seq, " +
	    		"A.user_seq AS userSeq, " +
	    		"A.type, " +
	    		"A.money, " +
	    		"A.start_date AS startDate, " +
	    		"A.end_date AS endDate, " +
	    		"A.complete_yn AS completeYn, " +
	    		"A.alram_yn AS alramYn, " +
	    		"A.note, " +
	    		"B.name, " +
	    		"B.phone_num AS phoneNum, " +
	    		"IFNULL(" +
	    			"A.money-" +
	    				"(" +
	    				"SELECT " +
	    					"IFNULL(SUM(C.repayment), 0) " +
	    				"FROM repayment C " +
	    				"WHERE C.ledger_seq=A.seq" +
	    				")" +
	    		", 0) AS sumMoney, " +
	    		"IFNULL(" +
	    			"(" +
	    			"SELECT " +
	    				"IFNULL(SUM(D.repayment), 0) " +
	    			"FROM repayment D " +
	    			"WHERE D.ledger_seq=A.seq" +
	    			")" +
	    		", 0) AS repayment " +
	    	"FROM ledger A " +
	    		"LEFT JOIN user B " +
	    			"ON A.user_seq=B.seq " +
	    	"WHERE A.user_seq=? " +
	    	"ORDER BY A.complete_yn, " +
	    	"(CASE WHEN (A.end_date IS NULL OR A.end_date = '') THEN 1 ELSE 0 END)";
		
		return DBA.excuteSql(query, param).then(function (result) {
            return DBA.getAll(result);
        });
	}
	
	self.getUserSumMoney = function(param){
		var query = 
			"SELECT " +
				"IFNULL(" +
					"(SELECT SUM(money) FROM ledger WHERE user_seq=? AND type='A')" +
				", 0) AS borrowMoney, " +
				"IFNULL(" +
					"(SELECT SUM(money) FROM ledger WHERE user_seq=? and type='B')" +
				", 0) AS lendMoney, " +
				"IFNULL(" +
					"(SELECT SUM(a.repayment) FROM repayment a JOIN ledger b ON a.ledger_seq=b.seq WHERE b.user_seq=? AND b.type='A')" +
				", 0) AS borrowSumMoney, " +
				"IFNULL(" +
					"(SELECT SUM(c.repayment) FROM repayment c JOIN ledger d ON c.ledger_seq=d.seq WHERE d.user_seq=? AND d.type='B')" +
				", 0) AS lendSumMoney, " +
				"user.name, "+
				"user.phone_num AS phoneNum " +
			"FROM ledger ledger " +
				"LEFT JOIN user user " +
					"ON ledger.user_seq=user.seq " +
			"WHERE ledger.user_seq=?";
		
		return DBA.excuteSql(query, param).then(function (result) {
			return DBA.getOne(result);
		});
	}
	
	self.getScheduleCnt = function(param){
		var query = 
			"SELECT " +
				"COUNT(*) AS cnt " +
			"FROM ledger " +
			"WHERE type=? " +
				"AND end_date < ? " +
				"AND end_date IS NOT NULL " +
				"AND end_date != '' " +
				"AND complete_yn='N'";
		
		return DBA.excuteSql(query, param).then(function(result){
        	return DBA.getOne(result);
        });
	}
	
	return self;
});
