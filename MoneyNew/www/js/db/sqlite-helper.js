var queryLedger = 
	"CREATE TABLE IF NOT EXISTS ledger " +
	"(" +
		"seq INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL" +
		", user_seq INTEGER NOT NULL" +
		", type VARCHAR NOT NULL" +
		", money DOUBLE NOT NULL" +
		", start_date VARCHAR NOT NULL" +
		", end_date VARCHAR" +
		", complete_yn VARCHAR DEFAULT N" +
		", alram_yn VARCHAR DEFAULT N" +
		", note TEXT" +
	")";
var queryRepayment = 
	"CREATE TABLE IF NOT EXISTS repayment " +
	"(" +
		"seq INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL" +
		", ledger_seq INTEGER NOT NULL" +
		", repayment DOUBLE NOT NULL" +
		", register_date VARCHAR NOT NULL" +
	")";

var queryUser = 
	"CREATE TABLE IF NOT EXISTS user " +
	"(" +
		"seq INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL" +
		", name VARCHAR NOT NULL" +
		", phone_num VARCHAR" +
	")";

function SqliteHelper(){
	this.db;
	this.resultFn;
	this.errorFn;
	this.init();
}

SqliteHelper.prototype = {
		init:function(){
			this.db = window.openDatabase("money.sqlite", '1', 'money', 1024 * 1024 * 50);
		},
		createTable:function(){
			this.db.transaction(function(ts){
				ts.executeSql(queryLedger, [], createTableResult, createTableError);
				ts.executeSql(queryRepayment, [], createTableResult, createTableError);
				ts.executeSql(queryUser, [], createTableResult, createTableError);
			});
		},
		setResultFn:function(fn){
			this.resultFn = fn;
		},
		setErrorFn:function(fn){
			this.errorFn = fn;
		},
		getDB:function(){
			return this.db;
		}
}

function createTableResult(){
	console.log("success create table...");
}

function createTableError(tx, error){
	console.log("error create table... : " + error.message);
}