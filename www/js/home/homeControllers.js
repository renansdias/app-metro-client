angular.module('appmetro.home.controllers', [
	'ionic',
	'appmetro.list.routes'
])

.controller('HomeController', [
	'$scope',
	'$ionicModal',
	'StationService',
	'$state',
	function($scope, $ionicModal, StationService, $state) {
		$scope.services = StationService.stationsFilteredByLine;

		$scope.showDefaultHeaderForOrigin = true;
		$scope.showDefaultHeaderForDestination = true;

		$scope.originHasBeenChosen = false;
		$scope.destinationHasBeenChosen = false;

		$scope.initialLabels = {
			origin: "Escolha a estação de origem",
			destination: "Escolha a estação destino"	
		}

		$ionicModal.fromTemplateUrl('templates/modals/modalStationPicker.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.stationPickerModal= modal;
		});

		// Open station picker modal
		$scope.openEstationPickerModal = function(terminal) {
			$scope.terminalStation = terminal;
			$scope.stationPickerModal.show();
		};

		// User did pick station
		$scope.userDidPickStation = function(station) {
			if ($scope.terminalStation === 'origin') {
				$scope.origin = StationService.getStationForStationId(station._id);

				// translate lines
				var translatedLines = [];

				for (var i = 0; i < $scope.origin.lines.length; i++) {
					if ($scope.origin.lines[i] === "red") {
						translatedLines.push("Vermelha");
					} else if ($scope.origin.lines[i] === "yellow") {
						translatedLines.push("Amarela");
					}
				}

				$scope.origin.translatedLines = translatedLines;
				$scope.originHasBeenChosen = true;
				$scope.showDefaultHeaderForOrigin = false;
			} else {
				$scope.destination = StationService.getStationForStationId(station._id);

				// translate lines
				var translatedLines = [];

				for (var i = 0; i < $scope.destination.lines.length; i++) {
					if ($scope.destination.lines[i] === "red") {
						translatedLines.push("Vermelha");
					} else if ($scope.destination.lines[i] === "yellow") {
						translatedLines.push("Amarela");
					}
				}
				
				$scope.destination.translatedLines = translatedLines;
				$scope.destinationHasBeenChosen = true;
				$scope.showDefaultHeaderForDestination = false;
			}

			// Close modal
			$scope.stationPickerModal.hide();
		}

		$scope.goToList = function() {
			$state.go('list', {
				origin: $scope.origin._id,
				destination: $scope.destination._id
			});
		}
	}
])