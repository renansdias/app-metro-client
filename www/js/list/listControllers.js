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

				var LatLng = new google.maps.LatLng(train.location.latitude, train.location.longitude);
	        	$scope.map.setCenter(LatLng);
	        	$scope.deleteMarkers();
	        	$scope.addMarker(LatLng);
			}, function(err) {

			});
		}, 2000);

  //       setTimeout(function() {
  //       	var LatLng = new google.maps.LatLng(-23.546324, -46.60747);
  //       	$scope.map.setCenter(LatLng);
  //       	$scope.deleteMarkers();
  //       	$scope.addMarker(LatLng);
  //       }, 10000);

  //       setTimeout(function() {
  //       	var LatLng = new google.maps.LatLng(-23.546580, -46.608522);
  //       	$scope.map.setCenter(LatLng);
  //       	$scope.deleteMarkers();
  //       	$scope.addMarker(LatLng);
  //       }, 13000);

  //       setTimeout(function() {
  //       	var LatLng = new google.maps.LatLng(-23.547052, -46.610775);
  //       	$scope.map.setCenter(LatLng);
  //       	$scope.deleteMarkers();
  //       	$scope.addMarker(LatLng);
  //       }, 16000);

  //       setTimeout(function() {
  //       	var LatLng = new google.maps.LatLng(-23.547603, -46.613028);
  //       	$scope.map.setCenter(LatLng);
  //       	$scope.deleteMarkers();
  //       	$scope.addMarker(LatLng);
  //       }, 19000);

  //       setTimeout(function() {
  //       	var LatLng = new google.maps.LatLng(-23.547701, -46.615410);
  //       	$scope.map.setCenter(LatLng);
  //       	$scope.deleteMarkers();
  //       	$scope.addMarker(LatLng);
  //       }, 22000);

  //       setTimeout(function() {
  //       	var LatLng = new google.maps.LatLng(-23.548095, -46.617727);
  //       	$scope.map.setCenter(LatLng);
  //       	$scope.deleteMarkers();
  //       	$scope.addMarker(LatLng);
  //       }, 25000);
	}
])