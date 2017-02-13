angular.module('stars')

.controller("signupCtrl",["$http","$scope","$cookieStore","$location","sendRequest", function($http, $scope, $cookieStore, $location, sendRequest){
	
	$scope.register = function(){
		console.log($scope.gender.code);

		sendRequest.send(
			'POST',
			'http://localhost:8080/noteKeepr-web/rest/user/'+$scope.username,
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			{
				username: $scope.username,
				password: $scope.password,
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				email: $scope.email,
				phonenumber: $scope.phonenumber,
				gender: $scope.gender.code
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
	
	$scope.gender =  {
		code: 'U',
		genders: [
			{id: 'M', name: 'Male'},
			{id: 'F', name: 'Female'},
			{id: 'U', name: 'Unknown'},
			{id: 'N', name: 'Neutral'}
		]
	};
	
}]);