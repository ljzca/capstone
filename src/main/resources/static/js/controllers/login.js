angular.module('stars')

.controller("loginCtrl",["$scope","$cookieStore","$location","$window","sendRequest", function($scope, $cookieStore, $location, $window, sendRequest){

	
    var selfReflect = function(username,password){
        sendRequest.send(
			'GET',
			'users/'+username+"",
			function (result) {
				
				console.log(result);
				$cookieStore.put("username",username);
				$cookieStore.put("password",password);
				
				var user = result.data;
				var isAdmin = false;
				
				if(result.data.isAdmin){
					isAdmin = true;
					$cookieStore.put("isAdmin",isAdmin);
					$location.path("records");
					//TODO
					//$location.path("admin");
				} else {
					$location.path("records");
					$window.location.reload();
				}
            },
			function (error) {
                $scope.errMsg = "invalid username or password"
            },
            null,
            username,
            password
		)};
	
	$scope.login = selfReflect;
		
	var username = $cookieStore.get("username");
	var password = $cookieStore.get("password");
	
	if(username && password)
		selfReflect(username,password);
}]);