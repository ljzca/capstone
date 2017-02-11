/**
 * ParsePlus
 */

(function(window){
	'use strict';
	function getParserInstance(){
		var Parser = {};
		
		Parser.parse = function(recordId, data){
			
			//Fields contains the split clean string data while cleanString is the array that 
			//contains the header, which is thrown away, and the cleanString.
			
			var timeRegex = "^\d{4}[\-]\d{2}[\-]\d{2}[T]\d{2}\:\d{2}\:\d{2}\.\d{2}[Z]$";
			
			var strings = JSON.stringify()
			
			var parsedStrings = [];
			var cleanString = [];
			
			
			//Removing the header
			cleanString = data.split(",,");
			parsedStrings = cleanString.split(" ");
			
			for(var i=0;i<parsedStrings.length;i++){
				
			}
			
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