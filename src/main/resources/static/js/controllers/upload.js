angular.module('stars')

.controller('upload', ['$scope', '$cookieStore', 'fileUpload', 'sendRequest', 'parser', 'constants', function($scope, $cookieStore, fileUpload, sendRequest, parser, constants){
    
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        read = new FileReader();
        read.readAsText(file);
        read.onloadend = function()
        {
            $scope.result = (read.result);
            
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
            			description: $scope.description,
            			owner: constants.rootURL + "users/" + $cookieStore.get('username')
            		},
            		function(result){
            			console.log("*********************** SUCCESS ***************************");
            			console.log(result);
            			
            			var objects = parser.parse($cookieStore.get('username'), $scope.title, $scope.result);
            			
            			console.log(objects[0]);
            			
            			for( i = 0; i < objects.length; i++)
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
            							
            						},
            	            		function(error){
            							console.log("*************** EPIC FAILURE ****************");
            							console.log(error);
            						}      		
            				);
            			}
            		},
            		function(error){
            			console.log("*********************** FAILURE ***************************");
            			console.log(error);
            			
            			
            		}
            );
        }
    };
    
    $scope.testFunction = function()
    {
    	 $cookieStore.put("username", "matt");
    	 $cookieStore.put("password", "password");
    }
    
}]);
