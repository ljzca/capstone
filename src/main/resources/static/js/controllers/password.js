angular.module('stars')

.controller("passwordCtrl",["$scope","$cookieStore","$location","sendRequest","$route", function($scope, $cookieStore, $location, sendRequest, $route){
	
	setNavBar();
	console.log($route.current.params.token);
	
	$scope.setPassword = function(newPassword){
		sendRequest.send(
			'PUT',
			'http://localhost:8080/noteKeepr-web/rest/user/'+$route.current.params.token+'/reset',
			'application/json',
			null,
			null,
			{
				password: newPassword
			},
			function (result) {
				$scope.errMsg = "password reset seccussfully. please go to login page to login";
            },
			function (error) {
				if(error.status==406)
					$scope.errMsg = "new password can not be empty";
				else
                	$scope.errMsg = "your password reset process may have expired. please resent email";
            }
		)
	}
	
}]);