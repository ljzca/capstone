angular.module('stars')

.controller("adminCtrl",["$scope","$cookieStore","$location","sendRequest", function($scope, $cookieStore, $location, sendRequest){
	
	$scope.isCreation = true;
	
	$scope.username = "";
	$scope.password = "";
	$scope.firstname = "";
	$scope.lastname = "";
	$scope.email = "";
	$scope.phonenumber = "";
	
	$scope.gender =  {
		code: 'U',
		genders: [
			{id: 'M', name: 'Male'},
			{id: 'F', name: 'Female'},
			{id: 'U', name: 'Unknown'},
			{id: 'N', name: 'Neutral'}
		]
	};
	
	
    var getUsers = function(){
        sendRequest.send(
			'GET',
			'http://localhost:8080/noteKeepr-web/rest/user',
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				console.log(result.data);
				result.data.forEach(function(user){
					user.isAdmin = false;
					user.roles.forEach(function(role){
						if(role.rolename === "admin"){
							user.isAdmin = true;
						}
					});
				});
				$scope.users = result.data;
            },
			function (error) {
                $scope.notice = "You don't have admin privilege to see other uses";
            }
		)};
	
	getUsers();
	
	$scope.promoteUser = function(username){
        sendRequest.send(
			'PUT',
			'http://localhost:8080/noteKeepr-web/rest/user/'+username+'/promote',
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				getUsers();
				$scope.notice = "You successfully promoted "+username;
            },
			function (error) {
                $scope.notice = "You don't have admin privilege to promote a user";
            }
		)};
	
	$scope.demoteUser = function(username){
        sendRequest.send(
			'PUT',
			'http://localhost:8080/noteKeepr-web/rest/user/'+username+'/demote',
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
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
            }
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
				$scope.phonenumber = user.phonenumber;
				$scope.gender.code = user.gender;
			}
		});
	};
	
	$scope.saveUser = function(username){
		
        sendRequest.send(
			'PUT',
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
				$scope.gender.code = 'U';
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
            }
		)};
	
	$scope.deleteUser = function(username){
        sendRequest.send(
			'DELETE',
			'http://localhost:8080/noteKeepr-web/rest/user/'+username,
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
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
            }
		)};
	
	$scope.createUser = function(){

		sendRequest.send(
			'POST',
			'http://localhost:8080/noteKeepr-web/rest/user',
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
            }
		)};
	
}]);