angular.module('noteKeepr')

.controller("loginCtrl",["$scope","$cookieStore","$location","$window","sendRequest", function($scope, $cookieStore, $location,$window, sendRequest){

    var selfReflect = function(username,password){
        sendRequest.send(
			'GET',
			'http://localhost:8080/noteKeepr-web/rest/user/'+username+'/self',
			'application/json',
			username,
			password,
			null,
			function (result) {
				
				console.log(result.data);
				$cookieStore.put("username",username);
				$cookieStore.put("password",password);
				
				var user = result.data;
				var isAdmin = false;
				
				result.data.roles.forEach(function(role){
					console.log(role.rolename);
					if(role.rolename === "admin")
						isAdmin = true;
				});
				
				$cookieStore.put("isAdmin",isAdmin);
				
				if(isAdmin){
					$location.path("admin");
					$window.location.reload();
				}
				else{
					$location.path("note");
					$window.location.reload();
				}
            },
			function (error) {
                $scope.errMsg = "invalid username or password"
            }
		)};
	
	$scope.login = selfReflect;
	
		
	var username = $cookieStore.get("username");
	var password = $cookieStore.get("password");
	
	if(username && password)
		selfReflect(username,password);
}]);