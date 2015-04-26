angular.module('appmetro.list.controllers', [
	'ionic',
	'appmetro.list.routes',
	'appmetro.list.services'
])

.controller('ListController', [
	'$scope',
	'$stateParams',
	'$state',
	function($scope, $stateParams, $state) {
		$scope.origin = $stateParams.origin;
		$scope.destination = $stateParams.destination;

		$scope.goToShortestPathTemplate = function() {
			$state.go('shortest-path', {
				origin: $scope.origin, 
				destination: $scope.destination
			});
		}

		$scope.goToClosestTrainTemplate = function() {
			$state.go('closest-train', {
				origin: $scope.origin,
				destination: $scope.destination
			});
		}
	}
])

.controller('ShortestPathController', [
	'$scope',
	'$stateParams',
	'ListService',
	'$ionicLoading',
	function($scope, $stateParams, ListService, $ionicLoading) {
		// As soon as this controller is loaded, we'll put
		// ionic loading in the screen until we get the
		// shortest path from our server
		$ionicLoading.show({
			template: "Carregando..."
		});

		var promise = ListService.getShortestPathForStations($stateParams.origin, $stateParams.destination);

		promise.then(function(result) {
			$ionicLoading.hide();

			$scope.stations = result;
		}, function(err) {
			
		});
	}
])

.controller('ClosestTrainController', [
	'$scope',
	'$stateParams',
	'ListService',
	function($scope, $stateParams, ListService) {

	}
])