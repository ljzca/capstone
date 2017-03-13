/**
 * This controller allows the user to upload a record to their account.
 * 
 * @author Matthew Rose
 */

angular.module('stars')

.controller('upload', ['$scope', '$cookieStore' ,'fileUpload', 'sendRequest', 'parser', 'constants', function($scope, $cookieStore, fileUpload, sendRequest, parser, constants){
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        if(file != null && file != "")
        {
	        var valid = true;
	        read = new FileReader();
	        read.readAsText(file);
	        read.onloadend = function()
	        {
	            $scope.result = (read.result);
	            
	            if($scope.result == null || $scope.result == "")
	            {
	            	$scope.fileError = "Please select a valid file.";
	            	valid = false;
	            }
	            else
	            {
	            	$scope.fileError = null;
	            }
	            if($scope.title == null || $scope.title == "")
	            {
	            	$scope.titleError = "Please enter a title.";
	            	valid = false;
	            }
	            else
	            {
	            	$scope.titleError = null;
	            }
	            
	            if(valid)
	            {
	            	$scope.fileError = null;
	            	$scope.titleError = null;
	            	$scope.success = "Loading...";
		            sendRequest.send
		            (
		            		'POST',
		            		'records',
		            		$cookieStore.get('username'),
		            		$cookieStore.get('password'),
		            		{
		            			id:
		            			{
		            				owner: $cookieStore.get('username'),
		                			title: $scope.title
		            			},
		            			description: $scope.description
		            		},
		            		function(result){
		            			console.log("*********************** SUCCESS ***************************");
		            			console.log(result);
		            			
		            			var objects = parser.parse($cookieStore.get('username'), $scope.title, $scope.result);
		            			
		            			var loopValid = true;
		            			
		            			try
		            			{
			            			for(var i = 0; i < objects.length-1; i++)
			            			{
				            				sendRequest.send
				            				(
				            						'POST',
				            	            		'recordDatas',
				            	            		$cookieStore.get('username'),
				            	            		$cookieStore.get('password'),
				            	            		objects[i],
				            	            		function(){
				            							console.log("*************** GREAT SUCCESS ****************");
//				            							if(loopValid === true)
//				            								$scope.success = "Record uploaded";
//				            							else
//				            								$scope.success = "Error uploading record";
				            							
				            							if(i == objects.length-1)
				            							{
				            								$scope.success = "Loading...";
				            							}
				            									
				            							
				            						},
				            	            		function(error){
				            							console.log("*************** EPIC FAILURE ****************");
				            							console.log(error);
				            							$scope.success = "Error uploading record";
				            							loopValid = false;
				            							
				            						}      		
				            				);
			            				
			            				if(loopValid === false)
			            				{
			            					throw "Bad Record";
			            				}
			            			}
		            			}
		            			catch(e)
		            			{
	            					$scope.success = "Error uploading record 1";
	            					sendRequest.send
		            				(
		            						'DELETE',
		            	            		'recordDatas/'+ $cookieStorer.get('username') + '&' + $scope.title,
		            	            		$cookieStore.get('username'),
		            	            		$cookieStore.get('password'),
		            	            		null,
		            	            		function(){
		            							console.log("*************** Failed Upload ****************");
		            							$scope.success = "Error uploading record";
		            						},
		            	            		function(error){
		            							console.log("*************** Failed Upload ****************");
		            							console.log(error);
		            							$scope.success = "Error uploading record";

		            							
		            						}      		
		            				);
		            			}
		            		},
		            		function(error){
		            			console.log("*********************** FAILURE ***************************");
		            			console.log(error);
		            			$scope.titleError = "Duplicate record name";
		            			
		            		}
		            );
	            }
	        }
        }
        
        else
        {
        	$scope.fileError = "Please select a valid file.";
        	
	        if($scope.title == null || $scope.title == "")
	        	$scope.titleError = "Please enter a title.";
        }
        
        
        //******************** Testing the count function ***************************
        
        
        setTimeout(function(){
//        var record = 
        sendRequest.send
        (
        	'GET',
        	'records/'+ $cookieStore.get('username') + '&' + $scope.title + '/recordData',
        	$cookieStore.get('username'),
    		$cookieStore.get('password'),
        	null,
        	function(success)
        	{
        		console.log("****** THATS GREAT ********");
        		console.log(success.data._embedded.recordDatas.length);
        		$scope.success = "Record uploaded";
        		$scope.dbComplete = true;
        	},
        	function()
        	{
        		console.log("****** OH NO **********");
        	}
        );
        
//        console.log(record.length);
        }, 10000);
    };
    
    $scope.testFunction = function()
    {
    	 $cookieStore.put("username", "matt");
    	 $cookieStore.put("password", "password");
    }
    
}]);
