angular.module('stars')

.service("parser",[function() {

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
					username: username,
					title: title,
					time: dataLine[0],
					lat: dataLine[1],
					lon: dataLine[2],
					hmsl: dataLine[3],
					velN: dataLine[4],
					velE: dataLine[5],
					velD: dataLine[6],
					HAcc: dataLine[7],
					vAcc: dataLine[8],
					sAcc: dataLine[9],
					heading: dataLine[10],
					cAcc: dataLine[11],
					gpsFix: dataLine[12],
					numSV: dataLine[13]
			}
			objectArray.push(dataObject);
		}
		var output = JSON.stringify(objectArray);
		return output;
    };
	
}]);