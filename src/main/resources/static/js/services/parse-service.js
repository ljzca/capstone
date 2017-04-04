angular.module('stars')

.service("parser", function() {

	this.parse = function (username, title, data) {
		
//		var timeRegex = "^\d{4}[\-]\d{2}[\-]\d{2}[T]\d{2}\:\d{2}\:\d{2}\.\d{2}[Z]$";
		console.log(data);
		var cleanData = [];
		var objectArray = [];
		
		cleanData = data.split("\r\n");
		
		for(i=2;i<cleanData.length;i++){
			var dataLine = cleanData[i].split(",");
			var convertToMs = new Date(dataLine[0]);
			var dataObject = {
					id: {
							owner: username,
							title: title,
							time: convertToMs.getTime()
					},
					latitude: dataLine[1],
					longitude: dataLine[2],
					pitch: dataLine[3],
					yaw: dataLine[4],
					roll: dataLine[5],
					altitude: dataLine[6],
					heading: dataLine[7],
					gvelocity: dataLine[8],
					vvelocity: dataLine[9],
					fvelocity: dataLine[10],
					xaccel: dataLine[11],
					yaccel: dataLine[12],
					zaccel: dataLine[13],
					aoa: dataLine[14],
					grratio: dataLine[15],
					temperature: dataLine[16]
			}
			objectArray.push(dataObject);
		}
		return objectArray;
    };	
});