/**
 * This controller allows the user to upload a record to their account.
 * 
 * @author Matthew Rose
 */

angular.module('stars')

.controller('upload', ['$scope', '$cookieStore' ,'fileUpload', 'sendRequest', 'parser', 'constants', function($scope, $cookieStore, fileUpload, sendRequest, parser, constants){
	setNavBar();
	
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
	            
	            //Checks for a valid file.
	            if($scope.result == null || $scope.result == "")
	            {
	            	$scope.fileError = "Please select a valid file.";
	            	valid = false;
	            }
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
	            else
	            {
	            	$scope.titleError = "";
	            }
	            
	            if(valid)
	            {
	            	$scope.fileError = null;
	            	$scope.titleError = null;
	            	$scope.success = "Uploading...";
		            sendRequest.send
		            (
		            		'POST',
		            		'records',
		            		function(result){
		            			console.log("*********************** SUCCESS ***************************");
//		            			console.log(result);
		            			
		            			console.log("Testing Result...")
//		            			console.log($scope.result);
		            			
		            			var objects = parser.parse($cookieStore.get('username'), $scope.title, $scope.result);
		            			
		            			console.log("Testing Objects...")
		            			console.log(objects);
		            			
		            			var loopValid = true;
		            			
		            			try
		            			{
			            			for(var i = 0; i < objects.length-1; i++)
			            			{
				            				sendRequest.send
				            				(
				            						'POST',
				            	            		'recordDatas',
				            	            		function(){
				            							console.log("*************** GREAT SUCCESS ****************");

				            							if(i == objects.length-1)
				            							{
				            								$scope.success = "Uploading...";
				            							}		
				            						},
				            	            		function(error){
				            							console.log("*************** EPIC FAILURE ****************");
				            							console.log(error);
				            							$scope.success = "Error uploading record";
				            							loopValid = false;	
				            						},
				            						objects[i],
				            	            		$cookieStore.get('username'),
				            	            		$cookieStore.get('password')
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
		            	            		function(){
		            							console.log("*************** Failed Upload ****************");
		            							$scope.success = "Error uploading record";
		            						},
		            	            		function(error){
		            							console.log("*************** Failed Upload ****************");
		            							console.log(error);
		            							$scope.success = "Error uploading record";
		            						},
		            						null,
		            	            		$cookieStore.get('username'),
		            	            		$cookieStore.get('password')
		            				);
		            			}
		            		},
		            		function(error){
		            			console.log("*********************** FAILURE ***************************");
		            			console.log(error);
		            			$scope.titleError = "Duplicate record name";
		            		},
		            		{
		            			id:
		            			{
		            				owner: $cookieStore.get('username'),
		                			title: $scope.title
		            			},
		            			description: $scope.description
		            		},
		            		$cookieStore.get('username'),
		            		$cookieStore.get('password')
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
        
        
        //******************** Upload Complete ***************************
        
        setTimeout(function(){
	        sendRequest.send
	        (
	        	'GET',
	        	'records/'+ $cookieStore.get('username') + '&' + $scope.title + '/recordData',
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
	        	},
	        	null,
        		$cookieStore.get('username'),
        		$cookieStore.get('password')
	        );
        }, 10000);
    };
    
//    $scope.testFunction = function()
//    {
//    	 $cookieStore.put("username", "matt");
//    	 $cookieStore.put("password", "password");
//    }
//    
//    $scope.testFunction2 = function()
//    {
//    	 $cookieStore.put("username", "steve");
//    	 $cookieStore.put("password", "password");
//    }
    
}]);
