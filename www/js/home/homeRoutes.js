angular.module('trainTracker.home.router', [
	'ionic',
	'trainTracker.home.controllers'
])

.config([
	'$stateProvider', 
	function($stateProvider) {
		$stateProvider

		.state('home', {
			url: '/home',
			controller: 'HomeController',
			templateUrl: 'templates/home/index.html'
		});
	}
])