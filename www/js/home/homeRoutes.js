angular.module('appmetro.home.router', [
	'ionic',
	'appmetro.home.controllers'
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