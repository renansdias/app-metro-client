stationsFilteredByLine: 
db.stations.aggregate([
	{"$unwind": "$lines"},
	{
		"$group": {
			_id: "$lines",
			stations: {
				"$addToSet": {
					_id: "$_id",
					name: "$name",
					location: "$location",
					nextStations: "$nextStations"
				}
			}
		}
	}
]);