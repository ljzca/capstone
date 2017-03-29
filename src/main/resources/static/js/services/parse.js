angular.module('stars')

.service("parser",['constants', function(constants) {

	this.parse = function (username, title, data) {
		
//		var timeRegex = "^\d{4}[\-]\d{2}[\-]\d{2}[T]\d{2}\:\d{2}\:\d{2}\.\d{2}[Z]$";
		console.log(data);
		
		var cleanData = [];
		var seperateStrings = [];
		var parsedStrings = [];
		var objectArray = [];
		
		cleanData = data.split(",,\r\n");
		seperateStrings = cleanData[1].split("\r\n");
		
		for(i=0;i<seperateStrings.length;i++){
			var dataLine = seperateStrings[i].split(",");
			var convertToMs = new Date(dataLine[0]);
			var dataObject = {
					id: {
							owner: username,
							title: title,
							time: convertToMs.getTime()
					},
					lat: dataLine[1],
					lon: dataLine[2],
					hmsl: dataLine[3],
					veln: dataLine[4],
					vele: dataLine[5],
					veld: dataLine[6],
					hacc: dataLine[7],
					vacc: dataLine[8],
					sacc: dataLine[9],
					heading: dataLine[10],
					cacc: dataLine[11],
					gpsfix: dataLine[12],
					numsv: dataLine[13]
			}
			objectArray.push(dataObject);
		}
		return objectArray;
    };
	
}]);