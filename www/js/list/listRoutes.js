angular.module('appmetro.list.routes', [
	'ionic',
	'appmetro.list.controllers'
])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider

	.state('list', {
		url: '/list',
		templateUrl: 'templates/list/list.html',
		controller: 'ListController'
	})
}])