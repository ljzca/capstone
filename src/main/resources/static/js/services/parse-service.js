angular.module('stars')

.service("parser", function() {

	
	//Parsing function
	this.parse = function (username, title, data) {
		
		var cleanData = [];
		var objectArray = [];
		
		cleanData = data.split("\n");
		
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
					temperature: dataLine[16],
					distance: dataLine[17]
			}
			
			if(! (dataLine[15] === "null")) 
				dataObject.grratio = dataLine[15];
				
			objectArray.push(dataObject);
		}
		return objectArray;
    };	
});