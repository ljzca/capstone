angular.module('stars')

.controller("gearAdminCtrl", function($scope, $cookieStore, $location, sendRequest, $uibModal){
	setNavBar();

	$scope.newBrand = {
	    name: null,
        description: null
    };

	console.log($scope.newBrand);

    $scope.showCreateBrandModal = function (size) {

        var modelInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                newBrand: function(){
                    return $scope.newBrand;
                }
            }
        });

        modelInstance.result.then(function (){
            console.log($scope.brand);
            sendRequest.send(
                'POST',
                'brands',
                function (result) {
                    console.log(result.data);
                    getBrands();
                },
                function (error) {
                    $scope.notice = "There was an error creating the brand"
                },
                {
                    name: $scope.newBrand.name,
                    description: $scope.newBrand.description
                },
                $cookieStore.get("username"),
                $cookieStore.get("password")
            )
        }, function () {

        });
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
	
	$scope.deleteBrand = function(brandname){
        sendRequest.send(
			'DELETE',
			'brands/'+brandname,
			function (result) {
				getBrands();
				$scope.notice = "You successfully deleted "+ brandname;
            },
			function (error) {
				if(error.status===406){
					$scope.notice = "You can't delete yourself";
				}else{
					$scope.notice = "An error occurred when deleting "+ brandname;
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
	
})

angular.module('stars').controller("ModalInstanceCtrl", function($scope, $uibModalInstance, newBrand) {

    $scope.newBrand = newBrand;

    $scope.ok = function() {
        $uibModalInstance.close();
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss();
    };
});