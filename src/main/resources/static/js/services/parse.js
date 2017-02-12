/**
 * 
 */
function parse(username, title, data){
			
			//parsedStrings contains the split clean string data while cleanString is the array that 
			//contains the header, which is thrown away, and the cleanString.
			
			//Validation will be placed here once further developed
			var timeRegex = "^\d{4}[\-]\d{2}[\-]\d{2}[T]\d{2}\:\d{2}\:\d{2}\.\d{2}[Z]$";
			
			var parsedStrings = [];
			var cleanString = [];
			var objectArray = [];

			
			//Removing the header
			cleanString = data.split(",,");
			parsedStrings = cleanString.split(" ");
			
			
			//split all the data into individual string lines, then split those lines into their own object which will be placed into
			//an array of objects to be stringified.
			for(i=0;i<parsedStrings.length;i++){
				var dataObject = parsedString[i].split(",");
				var dataLine = {
						username: username,
						title: title,
						time: dataObject[0],
						lat: dataObject[1],
						lon: dataObject[2],
						hmsl: dataObject[3],
						velN: dataObject[4],
						velE: dataObject[5],
						velD: dataObject[6],
						HAcc: dataObject[7],
						vAcc: dataObject[8],
						sAcc: dataObject[9],
						heading: dataObject[10],
						cAcc: dataObject[11],
						gpsFix: dataObject[12],
						numSV: dataObject[13]
				}
				objectArray.push(dataLine);
			}
			var output = JSON.stringify(objectArray);
			//Returning the clean strings
			return output;
		}