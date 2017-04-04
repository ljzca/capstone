angular.module('stars')

.controller("adminCtrl",["$scope","$cookieStore","$location","sendRequest", function($scope, $cookieStore, $location, sendRequest){
	
	$scope.isCreation = true;
	$scope.username = "";
	$scope.password = "";
	$scope.firstname = "";
	$scope.lastname = "";
	$scope.email = "";
	
	$scope.gender =  {
		code: 'U',
		genders: [
			{id: 'M', name: 'Male'},
			{id: 'F', name: 'Female'}
		]
	};
	
    var getUsers = function(){
        sendRequest.send(
			'GET',
			'users',
			function (result) {
				console.log(result.data);
				$scope.users = result.data._embedded.users;
            },
			function (error) {
                $scope.notice = "You don't have admin privilege to see other uses";
            },
            null,
			$cookieStore.get("username"),
			$cookieStore.get("password")
		)};
	
	getUsers();
	
	$scope.promoteUser = function(username){
        sendRequest.send(
			'PUT',
			'users/'+username,
			function (result) {
				getUsers();
				$scope.notice = "You successfully promoted "+username;
            },
			function (error) {
                $scope.notice = "You don't have admin privilege to promote a user";
            },
			null,
			$cookieStore.get("username"),
			$cookieStore.get("password")
        )};
	
	$scope.demoteUser = function(username){
        sendRequest.send(
			'PUT',
			'users/'+username,
			function (result) {
				getUsers();
				$scope.notice = "You successfully demoted "+username;
            },
			function (error) {
				if(error.status===406){
					$scope.notice = "You can't demote yourself";
				}else{
					$scope.notice = "You don't have admin privilege to demote a user";
				}
            },
			null,
			$cookieStore.get("username"),
			$cookieStore.get("password")
		)};
	
	$scope.editUser = function(username){
		
		$scope.isCreation = false;
		
		$scope.users.forEach(function(user){
			if(username === user.username){
				$scope.username = user.username;
				$scope.password = "";
				$scope.firstname = user.firstname;
				$scope.lastname = user.lastname;
				$scope.email = user.email;
				$scope.gender.code = user.gender;
			}
		});
	};
	
	$scope.saveUser = function(username){
		
        sendRequest.send(
			'PUT',
			'users/'+$scope.username,
			function (result) {
				$scope.isCreation = true;
				if($scope.username===$cookieStore.get("username") && $scope.password)
					$cookieStore.put("password",$scope.password);
				getUsers();
				
				$scope.username = "";
				$scope.password = "";
				$scope.firstname = "";
				$scope.lastname = "";
				$scope.email = "";
				$scope.phonenumber = "";
				$scope.gender.code = 'M';
				$scope.notice = username + " has been successfully updated";
				$scope.errMsg = null;
            },
			function (error) {
				if(error.status===406){
					$scope.notice = username + " can not be updated because of invalid input. Please check error information under your input";
					$scope.errMsg = error.data;
				}else{
					$scope.notice = "You may have just lost admin privilege to edit the user";
				}
            },
			{
				username: $scope.username,
				password: $scope.password,
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				email: $scope.email,
				phonenumber: $scope.phonenumber,
				gender: $scope.gender.code
			},
			$cookieStore.get("username"),
			$cookieStore.get("password")
		)};
	
	$scope.deleteUser = function(username){
        sendRequest.send(
			'DELETE',
			'users/'+username,
			function (result) {
				getUsers();
				$scope.notice = "You successfully deleted "+username;
            },
			function (error) {
				if(error.status===406){
					$scope.notice = "You can't delete yourself";
				}else{
					$scope.notice = "You may have just lost admin privilege to deleted the user";
				}
            },
            null,
			$cookieStore.get("username"),
			$cookieStore.get("password")
		)};
	
	$scope.createUser = function(){

		sendRequest.send(
			'POST',
			'users',
			function (result) {
				getUsers();
				
				var username = $scope.username;
				
				$scope.username = "";
				$scope.password = "";
				$scope.firstname = "";
				$scope.lastname = "";
				$scope.email = "";
				$scope.phonenumber = "";
				$scope.gender.code = 'U';
				$scope.notice = username + " has been successfully created";
				$scope.errMsg = null;
            },
			function (error) {
				if(error.status===406){
					$scope.notice = $scope.username + " can not be created because of invalid input. Please check error information under your input";
					$scope.errMsg = error.data;
				}else{
					$scope.notice = "You may have just lost admin privilege to create a user";
				}
            },
			{
				username: $scope.username,
				password: $scope.password,
				firstname: $scope.firstname,
				lastname: $scope.lastname,
				email: $scope.email,
				phonenumber: $scope.phonenumber,
				gender: $scope.gender.code
			},
			$cookieStore.get("username"),
			$cookieStore.get("password")
		)};
	
}]);