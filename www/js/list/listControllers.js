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

		$scope.goToClosestTrainDistanceTemplate = function() {
			$state.go('closest-train-distance', {
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
	'TrainSystemService',
	'$ionicLoading',
	function($scope, $stateParams, ListService, TrainSystemService, $ionicLoading) {

		/*
		 * As soon as the map loads, we'll focus it
		 * on Sé square (just until we get the location 
		 * of the closest train).
		 */
		var myLatlng = new google.maps.LatLng(-23.548666, -46.633340);
	 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        $scope.map = map;
        $scope.markers = [];

        $scope.addMarker = function(location) {
			var marker = new google.maps.Marker({
                position: location,
                map: $scope.map,
                title: "Train Location"
            });

			$scope.markers.push(marker);
		}

        $scope.setAllMap = function(map) {
			for (var i = 0; i < $scope.markers.length; i++) {
				$scope.markers[i].setMap(map);
			}
		}

        $scope.clearMarkers = function() {
			$scope.setAllMap(null);
		}

        $scope.deleteMarkers = function() {
			$scope.clearMarkers();
			$scope.markers = [];
		}

		$ionicLoading.show({
			template: 'Carregando...'
		});

		setTimeout(function() {
			var promise = TrainSystemService.getClosestTrain($stateParams.origin, $stateParams.destination);

			promise.then(function(train) {
				$ionicLoading.hide();

				if (typeof train.location !== 'undefined') {
					var LatLng = new google.maps.LatLng(train.location.latitude, train.location.longitude);
					$scope.map.setCenter(LatLng);
					$scope.deleteMarkers();
					$scope.addMarker(LatLng);

					$scope.socket = io.connect('http://localhost:3812');
					$scope.socket.emit('trackTrain', train._id);

					$scope.socket.on('trainLocationUpdate', function(latitude, longitude) {
						var LatLng = new google.maps.LatLng(latitude, longitude);
				    	$scope.map.setCenter(LatLng);
				    	$scope.deleteMarkers();
				    	$scope.addMarker(LatLng);
					});
				} else {
					alert('Não há nenhum trem vindo em sua direção. Por favor, espere um momento e tente novamente.');
				}
			}, function(err) {

			});
		}, 2000);
	}
])

.controller('ClosestTrainDistanceController', [
	'$scope',
	'$stateParams',
	'TrainSystemService',
	'$ionicLoading',
	function($scope, $stateParams, TrainSystemService, $ionicLoading) {
		var ionicLoadingHasHidden = false;
		var hasTrainReachedStation = false;

		$scope.trainResult = {
			trainLabel: "O trêm está a:",
			trainDistance: ""
		};

		$ionicLoading.show({
			template: 'Carregando...'
		});

		setTimeout(function() {
			var promise = TrainSystemService.getClosestTrain($stateParams.origin, $stateParams.destination);

			promise.then(function(train) {
				if (typeof train.location !== 'undefined') {
					$scope.socket = io.connect('http://localhost:3812');
					$scope.socket.emit('trackDistanceBetweenTrainAndStation', train, $stateParams.origin);

					$scope.socket.on('trainDistanceUpdate', function(distance) {
						if (!ionicLoadingHasHidden) {
							$ionicLoading.hide();
							ionicLoadingHasHidden = !ionicLoadingHasHidden;
						}

						if (distance >= 1000) {
							$scope.trainResult.trainDistance = (Math.round(((distance/1000.0) + 0.00001) * 100) / 100).toString() + " km";
						} else {
							$scope.trainResult.trainDistance = (Math.round(distance)).toString() + " m";

							if (distance === 0) {
								$scope.trainResult.trainLabel = "O trêm chegou na estação!"
							}
						}

						$scope.$apply();
					});
				} else {
					alert('Não há nenhum trem vindo em sua direção. Por favor, espere um momento e tente novamente.');
				}
			}, function(err) {

			});
		}, 2000);	
	}
])