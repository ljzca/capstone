angular.module('stars')

.controller('upload', ['$scope', '$cookieStore', 'fileUpload', 'sendRequest', 'parser', function($scope, $cookieStore, fileUpload, sendRequest, parser){
    
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
            			owner: $cookieStore.get('username'),
            			title: $scope.title,
            			description: $scope.description
            		},
            		function(result){
            			console.log("*********************** SUCCESS ***************************");
            			console.log(result);
            			
            			var objects = parser.parse($cookieStore.get('username'), $scope.title, $scope.result);
            			
            			forEach(objects)
            			{
            				
            			}
            		},
            		function(error){
            			console.log("*********************** FAILURE ***************************");
            			console.log(error);
            			
            			var objects = parser.parse($cookieStore.get('username'), $scope.title, $scope.result);
            			
            			
            			console.log(objects);
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
