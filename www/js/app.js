// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('appmetro', ['ionic', 'appmetro.home.router'])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $state.go('home');
  });
})

.service('StationService', function() {
    this.stationsFilteredByLine = [
        { "line" : "Vermelha", "stations" : [ { "_id" : 1600, "name" : "Marechal Deodoro", "location" : { "latitude" : -23.533764, "longitude" : -46.655986 }, "nextStations" : [ 1500, 1700 ] }, { "_id" : 1500, "name" : "Santa Cecília", "location" : { "latitude" : -23.539646, "longitude" : -46.648927 }, "nextStations" : [ 1400, 1600 ] }, { "_id" : 1400, "name" : "República", "location" : { "latitude" : -23.544347, "longitude" : -46.642854 }, "nextStations" : [ 1300, 1500, 1239 ] }, { "_id" : 1200, "name" : "Sé", "location" : { "latitude" : -23.550632, "longitude" : -46.633284 }, "nextStations" : [ 1100, 1300 ] }, { "_id" : 1300, "name" : "Anhangabaú", "location" : { "latitude" : -23.547927, "longitude" : -46.639324 }, "nextStations" : [ 1200, 1400 ] }, { "_id" : 1100, "name" : "Pedro II", "location" : { "latitude" : -23.549786, "longitude" : -46.625945 }, "nextStations" : [ 1000, 1200 ] }, { "_id" : 700, "name" : "Tatuapé", "location" : { "latitude" : -23.540029, "longitude" : -46.576614 }, "nextStations" : [ 600, 800 ] }, { "_id" : 100, "name" : "Arthur Alvim", "location" : { "latitude" : -23.54044, "longitude" : -46.484449 }, "nextStations" : [ 0, 200 ] }, { "_id" : 1000, "name" : "Brás", "location" : { "latitude" : -23.547701, "longitude" : -46.61541 }, "nextStations" : [ 900, 1100 ] }, { "_id" : 400, "name" : "Vila Matilde", "location" : { "latitude" : -23.531757, "longitude" : -46.531167 }, "nextStations" : [ 300, 500 ] }, { "_id" : 500, "name" : "Penha", "location" : { "latitude" : -23.533606, "longitude" : -46.544084 }, "nextStations" : [ 400, 600 ] }, { "_id" : 800, "name" : "Belém", "location" : { "latitude" : -23.543078, "longitude" : -46.589811 }, "nextStations" : [ 700, 900 ] }, { "_id" : 1700, "name" : "Barra Funda", "location" : { "latitude" : -23.525756, "longitude" : -46.665792 }, "nextStations" : [ 1600 ] }, { "_id" : 300, "name" : "Guilhermina Esperança", "location" : { "latitude" : -23.529022, "longitude" : -46.516382 }, "nextStations" : [ 200, 400 ] }, { "_id" : 0, "name" : "Corinthians Itaquera", "location" : { "latitude" : -23.542323, "longitude" : -46.471429 }, "nextStations" : [ 100 ] }, { "_id" : 200, "name" : "Patriarca", "location" : { "latitude" : -23.530484, "longitude" : -46.502672 }, "nextStations" : [ 100, 300 ] }, { "_id" : 600, "name" : "Carrão", "location" : { "latitude" : -23.537551, "longitude" : -46.563847 }, "nextStations" : [ 500, 700 ] }, { "_id" : 900, "name" : "Bresser Mooca", "location" : { "latitude" : -23.546324, "longitude" : -46.60747 }, "nextStations" : [ 800, 1000 ] } ] },
        { "line" : "Amarela", "stations" : [ { "_id" : 2205, "name" : "Butantã", "location" : { "latitude" : -23.571508, "longitude" : -46.709012 }, "nextStations" : [ 2044 ] }, { "_id" : 2044, "name" : "Pinheiros", "location" : { "latitude" : -23.566512, "longitude" : -46.70309 }, "nextStations" : [ 1883, 2205 ] }, { "_id" : 1883, "name" : "Faria Lima", "location" : { "latitude" : -23.567564, "longitude" : -46.692753 }, "nextStations" : [ 1722, 2044 ] }, { "_id" : 1722, "name" : "Fradique Coutinho", "location" : { "latitude" : -23.56607, "longitude" : -46.684427 }, "nextStations" : [ 1561, 1883 ] }, { "_id" : 1561, "name" : "Paulista", "location" : { "latitude" : -23.555016, "longitude" : -46.662197 }, "nextStations" : [ 1400, 1722 ] }, { "_id" : 1239, "name" : "Luz", "location" : { "latitude" : -23.538135, "longitude" : -46.634334 }, "nextStations" : [ 1400 ] }, { "_id" : 1400, "name" : "República", "location" : { "latitude" : -23.544347, "longitude" : -46.642854 }, "nextStations" : [ 1300, 1500, 1239 ] } ] }
    ];

    this.stations = [{ "_id" : 0, "name" : "Corinthians Itaquera", "lines" : [ "red" ], "location" : { "latitude" : -23.542323, "longitude" : -46.471429 }, "nextStations" : [ 100 ] },{ "_id" : 100, "name" : "Arthur Alvim", "lines" : [ "red" ], "location" : { "latitude" : -23.54044, "longitude" : -46.484449 }, "nextStations" : [ 0, 200 ] },{ "_id" : 200, "name" : "Patriarca", "lines" : [ "red" ], "location" : { "latitude" : -23.530484, "longitude" : -46.502672 }, "nextStations" : [ 100, 300 ] },{ "_id" : 300, "name" : "Guilhermina Esperança", "lines" : [ "red" ], "location" : { "latitude" : -23.529022, "longitude" : -46.516382 }, "nextStations" : [ 200, 400 ] },{ "_id" : 400, "name" : "Vila Matilde", "lines" : [ "red" ], "location" : { "latitude" : -23.531757, "longitude" : -46.531167 }, "nextStations" : [ 300, 500 ] },{ "_id" : 500, "name" : "Penha", "lines" : [ "red" ], "location" : { "latitude" : -23.533606, "longitude" : -46.544084 }, "nextStations" : [ 400, 600 ] },{ "_id" : 600, "name" : "Carrão", "lines" : [ "red" ], "location" : { "latitude" : -23.537551, "longitude" : -46.563847 }, "nextStations" : [ 500, 700 ] },{ "_id" : 700, "name" : "Tatuapé", "lines" : [ "red" ], "location" : { "latitude" : -23.540029, "longitude" : -46.576614 }, "nextStations" : [ 600, 800 ] },{ "_id" : 800, "name" : "Belém", "lines" : [ "red" ], "location" : { "latitude" : -23.543078, "longitude" : -46.589811 }, "nextStations" : [ 700, 900 ] },{ "_id" : 900, "name" : "Bresser Mooca", "lines" : [ "red" ], "location" : { "latitude" : -23.546324, "longitude" : -46.60747 }, "nextStations" : [ 800, 1000 ] },{ "_id" : 1000, "name" : "Brás", "lines" : [ "red" ], "location" : { "latitude" : -23.547701, "longitude" : -46.61541 }, "nextStations" : [ 900, 1100 ] },{ "_id" : 1100, "name" : "Pedro II", "lines" : [ "red" ], "location" : { "latitude" : -23.549786, "longitude" : -46.625945 }, "nextStations" : [ 1000, 1200 ] },{ "_id" : 1200, "name" : "Sé", "lines" : [ "red" ], "location" : { "latitude" : -23.550632, "longitude" : -46.633284 }, "nextStations" : [ 1100, 1300 ] },{ "_id" : 1239, "name" : "Luz", "lines" : [ "yellow" ], "location" : { "latitude" : -23.538135, "longitude" : -46.634334 }, "nextStations" : [ 1400 ] },{ "_id" : 1300, "name" : "Anhangabaú", "lines" : [ "red" ], "location" : { "latitude" : -23.547927, "longitude" : -46.639324 }, "nextStations" : [ 1200, 1400 ] },{ "_id" : 1400, "name" : "República", "lines" : [ "red", "yellow" ], "location" : { "latitude" : -23.544347, "longitude" : -46.642854 }, "nextStations" : [ 1300, 1500, 1239 ] },{ "_id" : 1500, "name" : "Santa Cecília", "lines" : [ "red" ], "location" : { "latitude" : -23.539646, "longitude" : -46.648927 }, "nextStations" : [ 1400, 1600 ] },{ "_id" : 1561, "name" : "Paulista", "lines" : [ "yellow" ], "location" : { "latitude" : -23.555016, "longitude" : -46.662197 }, "nextStations" : [ 1400, 1722 ] },{ "_id" : 1600, "name" : "Marechal Deodoro", "lines" : [ "red" ], "location" : { "latitude" : -23.533764, "longitude" : -46.655986 }, "nextStations" : [ 1500, 1700 ] },{ "_id" : 1700, "name" : "Barra Funda", "lines" : [ "red" ], "location" : { "latitude" : -23.525756, "longitude" : -46.665792 }, "nextStations" : [ 1600 ] },{ "_id" : 1722, "name" : "Fradique Coutinho", "lines" : [ "yellow" ], "location" : { "latitude" : -23.56607, "longitude" : -46.684427 }, "nextStations" : [ 1561, 1883 ] },{ "_id" : 1883, "name" : "Faria Lima", "lines" : [ "yellow" ], "location" : { "latitude" : -23.567564, "longitude" : -46.692753 }, "nextStations" : [ 1722, 2044 ] },{ "_id" : 2044, "name" : "Pinheiros", "lines" : [ "yellow" ], "location" : { "latitude" : -23.566512, "longitude" : -46.70309 }, "nextStations" : [ 1883, 2205 ] },{ "_id" : 2205, "name" : "Butantã", "lines" : [ "yellow" ], "location" : { "latitude" : -23.571508, "longitude" : -46.709012 }, "nextStations" : [ 2044 ] }];

    /**
     * path is an array of station IDs, like:
     * ["600", "700", "800", "1000"]
     */
    this.getStationsForPath = function(path) {
        var stationsPath = [];

        for (var i = 0; i < path.length; i++) {
            var stationId = parseInt(path[i]);

            for (var j = 0; j < this.stations.length; j++) {
                var station = this.stations[j];

                if (stationId === station._id) {
                    stationsPath.push(station);
                }
            }
        }

        return stationsPath;
    }

    this.getStationForStationId = function(stationId) {
        var station = undefined;

        this.stations.forEach(function(elem) {
            if (elem._id === stationId)
                station = elem;
        });

        return station;
    }
})

.service('TrainSystemService', [
    '$q',
    '$http',
    function($q, $http) {
        this.getClosestTrain = function(origin, destination) {
            var queryString = "origin=" + origin + "&destination=" + destination;
            var deferred = $q.defer();

            var promise = $http.get('http://localhost:3700/trains/closest?' + queryString);

            promise.then(function(result) {
                deferred.resolve(result.data);
            }, function(err) {
                deferred.reject(err);
            })

            return deferred.promise;
        }
    }
]);