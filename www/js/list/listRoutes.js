angular.module('appmetro.list.routes', [
	'ionic',
	'appmetro.list.controllers'
])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider

	.state('list', {
		url: '/list?origin?destination',
		templateUrl: 'templates/list/list.html',
		controller: 'ListController'
	})

	.state('shortest-path', {
		url: '/list/shortest-path?origin&destination',
		templateUrl: 'templates/list/shortest-path.html',
		controller: 'ShortestPathController'
	})

	.state('closest-train', {
		url: '/list/closest-train?origin&destination',
		templateUrl: 'templates/list/closest-train.html',
		controller: 'ClosestTrainController'
	})
}])