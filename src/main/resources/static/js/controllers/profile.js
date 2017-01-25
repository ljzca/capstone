angular.module('noteKeepr')

.controller("profCtrl",["$scope","$cookieStore","$location","sendRequest", function($scope, $cookieStore, $location, sendRequest){
	
    var selfReflect = function(){
        sendRequest.send(
			'GET',
			'http://localhost:8080/noteKeepr-web/rest/user/'+$cookieStore.get("username")+'/self',
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				console.log(result.data);
				
				$scope.username = $cookieStore.get("username");
//				$scope.password = $cookieStore.get("password");
				$scope.firstname = result.data.firstname;
				$scope.lastname = result.data.lastname;
				$scope.email = result.data.email;
				$scope.phonenumber = result.data.phonenumber;
				$scope.gender.code = result.data.gender;
				
            },
			function (error) {
                $scope.errMsg = "You didn't login in";
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
	
	selfReflect();
	
	
	
	$scope.updateProfile = function(){
		
        sendRequest.send(
			'PUT',
			'http://localhost:8080/noteKeepr-web/rest/user',
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			{
				username: $cookieStore.get("username"),
				password: $scope.password,
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				email: $scope.email,
				phonenumber: $scope.phonenumber,
				gender: $scope.gender.code
			},
			function (result) {
				if($scope.username===$cookieStore.get("username") && $scope.password){
					$cookieStore.put("password",$scope.password);
				}
				$scope.errMsg = null;
				$scope.notice = "You have updated your profile";
            },
			function (error) {
				if(error.status===406){
					console.log(error.data);
					$scope.errMsg = error.data;
					$scope.notice = "";
				}else{
					$scope.notice = "You haven't logged in";
				}
            }
		)};
	
}]);