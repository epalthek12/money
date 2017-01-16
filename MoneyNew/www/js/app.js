
var mudule = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova']);

mudule.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
		
		var helper = new SqliteHelper();
		helper.createTable();
	});
});

mudule.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	
	$ionicConfigProvider.tabs.position('bottom');

	var provider = $stateProvider;
	provider.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/tabs.html'
	});

	provider.state('tab.sum', {
		url: '/sum',
		cache:false,
		views: {
			'tab-sum': {
				templateUrl: 'templates/sum.html',
				controller: 'SumCtrl'
			}
		}
	});
	
	provider.state('tab.borrow', {
		url: '/borrow',
		cache:false,
		views: {
			'tab-borrow': {
				templateUrl: 'templates/borrow.html',
				controller: 'BorrowCtrl'
			}
		}
	});
	
	provider.state('tab.lend', {
		url: '/lend',
		cache:false,
		views: {
			'tab-lend': {
				templateUrl: 'templates/lend.html',
				controller: 'LendCtrl'
			}
		}
	});
	
	provider.state('register', {
		cache:false,
		url: '/register/:type/:seq',
		templateUrl: 'templates/register.html',
		controller: 'RegisterCtrl'
	});
	
	provider.state('detail', {
		cache: false,
		url: '/detail/:type/:seq',
		templateUrl: 'templates/detail.html',
		controller: 'DetailCtrl'
	});
	
	provider.state('user', {
		cache: false,
		url: '/user/:userSeq',
		templateUrl: 'templates/user.html',
		controller: 'UserCtrl'
	});
	
	$urlRouterProvider.otherwise('/tab/sum');
});