angular.module('appmetro.list.services', [
	'ionic',
])

.factory('ListService', [
	'$http',
	'$q',
	'StationService',
	function($http, $q, StationService) {
		var listService = {};

		listService.getShortestPathForStations = function(origin, destination) {
			var queryString = "origin=" + origin + "&destination=" + destination;
			var deferred = $q.defer();

			var promise = $http.get("http://localhost:3700/stations/shortest-path?" + queryString)

			promise.then(function(result) {
				var path = StationService.getStationsForPath(result.data);

				deferred.resolve(path);
			}, function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		}

		return listService;
	}
])