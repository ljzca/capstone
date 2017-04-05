angular.module('stars')

.controller("forgotCtrl",["$scope","$cookieStore","$location","sendRequest","$route", function($scope, $cookieStore, $location, sendRequest, $route){
	setNavBar();
	
	$scope.send = function(username){
		sendRequest.send(
			'GET',
			'http://localhost:8080/noteKeepr-web/rest/user/'+username+'/forgot',
			'application/json',
			null,
			null,
			null,
			function (result) {
				$scope.errMsg = "email sent, please check your email";
            },
			function (error) {
                $scope.errMsg = "username not found";
            }
		)
	}
	
}]);