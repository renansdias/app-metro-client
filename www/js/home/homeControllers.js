angular.module('appmetro.home.controllers', ['ionic'])

.controller('HomeController', [
	'$scope',
	'$ionicModal',
	function($scope, $ionicModal) {
		$ionicModal.fromTemplateUrl('templates/modals/modalStationPicker.html', {
			scope: $scope
		}).then(function(modal) {
			$scope.stationPickerModal= modal;
		});

		// Open station picker modal
		$scope.openEstationPickerModal = function(str) {
			$scope.stationPickerModal.show();
		};
	}
])