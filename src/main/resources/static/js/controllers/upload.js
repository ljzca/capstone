/**
 * This controller allows the user to upload a record to their account.
 * 
 * @author Matthew Rose
 */

angular.module('stars')

.controller('upload', ['$scope', '$cookieStore' ,'fileUpload', 'sendRequest', 'parser', 'constants', function($scope, $cookieStore, fileUpload, sendRequest, parser, constants){
	setNavBar();
	
	/**
	 * This function can be called to upload the given file to the database
	 */
    $scope.uploadFile = function()
    {
    	var file = $scope.myFile; // The file to be uploaded
        
    	//If the user uploaded a file into the file input
        if(file != null && file != "")
        {
	        var valid = true; // Determines if the file is valid
	        
	        //Read the text from the file
	        read = new FileReader();
	        read.readAsText(file);
	        
	        /**
	         * This function will run after the file is read
	         */
	        read.onloadend = function()
	        {
	            $scope.result = (read.result); // The contents of the file uploaded
	            
	            //Checks for a valid file.
	            if($scope.result == null || $scope.result == "")
	            {
	            	$scope.fileError = "Please select a valid file.";
	            	valid = false;
	            }
	            //Remove the file error if the file is valid
	            else
	            {
	            	$scope.fileError = null;
	            }
	            
	            //Checks for a valid title.
	            if($scope.title == null || $scope.title == "")
	            {
	            	$scope.titleError = "Please enter a title.";
	            	valid = false;
	            }
	            //Remove the title error if the title is valid
	            else
	            {
	            	$scope.titleError = "";
	            }
	            
	            //If the file has a valid file and name...
	            if(valid)
	            {
	            	//Remove both error messages
	            	$scope.fileError = null;
	            	$scope.titleError = null;
	            	
	            	//Create the record in the database
		            sendRequest.send
		            (
		            		'POST',
		            		'records',
		            		function(result)
		            		{
		            			//Pass the username, title, and file contents to the parser to be parsed into an array of objects
		            			var objects = parser.parse($cookieStore.get('username'), $scope.title, $scope.result);
		            
	            				//Sets the success message
	            				$scope.success = "Uploading...";
		            		
	            				//Begin uploading the data to the record
	            				for(var i = 0; i < objects.length-1; i++)
		            			{
		            				sendRequest.send
		            				(
		            						'POST',
		            	            		'recordDatas',
		            	            		function(){},
		            	            		function(error)
		            	            		{
		            							$scope.error = "One or more lines in the record may be corrupted.";
		            						},
		            						objects[i], // Pass each row of data to the record
		            	            		$cookieStore.get('username'),
		            	            		$cookieStore.get('password')
		            				);

		            			}
		            		},
		            		function(error)
		            		{
		            			// The upload will fail if the record title already exists in the database
		            			$scope.titleError = "Duplicate record title";
		            		},
		            		{
		            			id:
		            			{
		            				owner: $cookieStore.get('username'),	//Set the owner of the record
		                			title: $scope.title		//Set the title of the record
		            			},
		            			description: $scope.description //Set the description of the record
		            		},
		            		$cookieStore.get('username'),
		            		$cookieStore.get('password')
		            );
	            }
	        }
        }
        
        // If no file is uploaded to the file input
        else
        {
        	// Set the file error
        	$scope.fileError = "Please select a valid file.";
        	
        	// If the user did not enter a title
	        if($scope.title == null || $scope.title == "")
	        	$scope.titleError = "Please enter a title.";
        }
  
        //This GET request is used to determine when the upload is completed
        setTimeout(function(){
	        sendRequest.send
	        (
	        	'GET',
	        	'records/'+ $cookieStore.get('username') + '&' + $scope.title + '/recordData',
	        	function(success)
	        	{
	        		$scope.success = "Record uploaded";
	        	},
	        	function()
	        	{},
	        	null,
        		$cookieStore.get('username'),
        		$cookieStore.get('password')
	        );
        }, 1000);
    };    
}]);
