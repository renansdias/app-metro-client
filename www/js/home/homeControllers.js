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
				$scope.origin = station;
			} else {
				$scope.destination = station;
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