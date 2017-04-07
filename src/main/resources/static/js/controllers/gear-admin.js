angular.module('stars')

.controller("gearAdminCtrl", function($scope, $cookieStore, $location, sendRequest){
	setNavBar();


	$scope.showCreateBrandModal = function () {


	};






	$scope.isCreation = true;
	
    var getBrands = function(){
        sendRequest.send(
			'GET',
			'brands',
			function (result) {
				console.log(result.data);
				$scope.brands = result.data._embedded.brands;
            },
			function (error) {
                $scope.notice = "There was an error obtaining the brands";
            },
            null,
			$cookieStore.get("username"),
			$cookieStore.get("password")
		)};
	
	getBrands();
	
	$scope.editBrand = function(brand){
		
		$scope.isCreation = false;
		
		$scope.brands.forEach(function(brand){
			if(brand === brand.id){
				$scope.id = brand.id;
				$scope.description = "";
			}
		});
	};
	
	$scope.saveBrand = function(brand){
        sendRequest.send(
			'PUT',
			'brands/'+$scope.id,
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
	
	$scope.deleteBrand = function(username){
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
	
	$scope.createBrand = function(){

		sendRequest.send(
			'POST',
			'brands',
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
	
});