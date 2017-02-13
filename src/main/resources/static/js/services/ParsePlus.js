/**
 * ParsePlus
 */

(function(window){
	'use strict';
	function getParserInstance(){
		var Parser = {};
		
		Parser.parse = function(recordId, data){
			
			//parsedStrings contains the split clean string data while cleanString is the array that 
			//contains the header, which is thrown away, and the cleanString.
			
			var timeRegex = "^\d{4}[\-]\d{2}[\-]\d{2}[T]\d{2}\:\d{2}\:\d{2}\.\d{2}[Z]$";
			
			var parsedStrings = [];
			var cleanString = [];
			var objectArray = [];

			
			//Removing the header
			cleanString = data.split(",,");
			parsedStrings = cleanString.split(" ");
			
			for(i=0;i<parsedStrings.length;i++){
				var dataObject = parsedString[i].split(",");
				var dataLine = {
						time: dataObject[0],
						lat: dataObject[1],
						lon: dataObject[2],
						hmsl: dataObject[3],
						velN: dataObject[4],
						velE: dataObject[5]
						velD: dataObject[6],
						HAcc: dataObject[7],
						vAcc: dataObject[8],
						sAcc: dataObject[9],
						heading: dataObject[10],
						cAcc: dataObject[11],
						gpsFix: dataObject[12],
						numSV: dataObject[13]
				}
				objectArray.push(dataObject);
			}
			
			
			var strings = JSON.stringify(objectArray);
			//Returning the clean strings
			return parsedStrings;
		}
		return getParserInstance;
	}
	
	if(typeof(getParserInstance) === 'undefined'){
		window.Parser = getParserInstance();		
	} else {
		return window.Parser;
	}
})(window);