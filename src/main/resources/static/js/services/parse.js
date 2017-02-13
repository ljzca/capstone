angular.module('stars')

.service("parser",['constants', function(constants) {

	this.parse = function (username, title, data) {
		
		console.log(data);
		
		var cleanData = [];
		var seperateStrings = [];
		var parsedStrings = [];
		var objectArray = [];
		
		cleanData = data.split(",,\r\n");
		seperateStrings = cleanData[1].split("\r\n");
		
		for(i=0;i<seperateStrings.length;i++){
			var dataLine = seperateStrings[i].split(",");
			var dataObject = {
					id: {
							owner: username,
							title: title,
							time: dataLine[0]
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