angular.module('stars')

.controller("signupCtrl",["$http","$scope","$cookieStore","$location","sendRequest", function($http, $scope, $cookieStore, $location, sendRequest){
	
	$scope.register = function(){

		
		console.log("Button Clicked!");
		sendRequest.send(
			'POST',
			'users',
			null,
			null,
			{
				username: $scope.username,
				password: $scope.password,
				email: $scope.email
			},
			function (result) {
				$location.path("signedup");
            },
			function (error) {
				if(error.status === 406){
					$scope.errMsg = error.data;
				}
            }
		)};
}]);