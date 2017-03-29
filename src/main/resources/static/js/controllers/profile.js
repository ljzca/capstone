angular.module('stars')

.controller("profCtrl",["$scope","$cookieStore","$location","sendRequest", function($scope, $cookieStore, $location, sendRequest){
	
	$scope.username = $cookieStore.get("username");
		
    var selfReflect = function(){
        sendRequest.send(
			'GET',
			'users/'+$cookieStore.get("username"),
			function (result) {
				console.log(result.data);
				
				$scope.username = $cookieStore.get("username");
//				$scope.password = $cookieStore.get("password");
				$scope.email = result.data.email;
            },
			function (error) {
            	console.log("Error!");
                $scope.errMsg = "You didn't login in";
            },
            null,
			$cookieStore.get("username"),
			$cookieStore.get("password")
		)};

	selfReflect();
	
	$scope.updateProfile = function(){
		
        sendRequest.send(
			'PUT',
			'users/'+$cookieStore.get("username"),
			function (result) {
				if($scope.username===$cookieStore.get("username") && $scope.password && $scope.confirmpassword && $scope.password === $scope.confirmpassword && $scope.currentpassword === $cookieStore.get("password")){
					$cookieStore.put("password",$scope.password);
				}
				$scope.errMsg = null;
				$scope.notice = "You have updated your password";
				$scope.confirmpassword = "";
				$scope.password = "";
				$scope.currentpassword = "";
            },
			function (error) {
				if(error.status===406){
					console.log(error.data);
					$scope.errMsg = error.data;
					$scope.notice = "";
				}else{
					$scope.notice = "You haven't logged in";
				}
            },
            {
				username: $cookieStore.get("username"),
				password: $scope.password,
				email: $scope.email,
			},
			$cookieStore.get("username"),
			$cookieStore.get("password")
		)};
	
}]);