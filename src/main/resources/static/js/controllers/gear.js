angular.module('stars')

	.controller('gearCtrl',["$scope","$cookieStore","$location","$window","sendRequest", function ($scope, $cookieStore, $location, $window, sendRequest) {

		setNavBar();
		
	    //Populates Brand drop down.
		var getBrand = function () {
			sendRequest.send(
				'GET',
				'brands',
				function (result) {
					$scope.brands = result.data._embedded.brands;
				},
				function (error) {
					$scope.notice = "Unable to retrieve companies.";
				}
			);
		};

		//Populates Models drop down.
		$scope.getModels = function() {
			sendRequest.send(
			'GET',
			'brands/'+$scope.selectedBrand.id+'/models',
			function (result)
			{
				console.log(result.data.models);
				$scope.models = [];
				for(var i=0;i<result.data._embedded.models.length;i++){
				    var resultString = result.data._embedded.models[i]._links.model.href;
				    $scope.models.push(decodeURIComponent(resultString.substring(resultString.indexOf("&")+1)));
                }
			},
            function (error) {
                console.log("getModels Failed");
            }
			)
		};


		$scope.getGearModels = function() {
            sendRequest.send(
                'GET',
                'brands/'+$scope.gear.brand+'/models',
                function (result)
                {
                    console.log(result.data.models);
                    $scope.models = [];
                    for(var i=0;i<result.data._embedded.models.length;i++){
                        var resultString = result.data._embedded.models[i]._links.model.href;
                        console.log(resultString);
                        $scope.models.push(decodeURIComponent(resultString.substring(resultString.indexOf("&")+1)));
                    }
                },
                function (error) {
                    console.log("getModels Failed");
                }
            )
        };

		//Retrieves User gear
		var getGear = function () {
			sendRequest.send(
				'GET',
				'users/' + $cookieStore.get('username') + '/gears',
				function (result) {
				    var gearListArray = [];
				    for(var i=0;i<result.data._embedded.gears.length;i++){
				        var resultString = result.data._embedded.gears[i]._links.gear.href;
				        resultString = resultString.substring(33);
				        var gearString = resultString.split("&");
				        var gearObj = {
				            brand: gearString[0],
                            model: gearString[1],
                            description: result.data._embedded.gears[i].description
                        };
				        gearListArray.push(gearObj);
                    }
                    console.log(gearListArray);
                    $scope.gearList = gearListArray;
				},
				function (error) {
					// $scope.errMsg = "There was an error loading gear information";
					console.log(error);
				},
				null,
				$cookieStore.get('username'),
				$cookieStore.get('password')
			)
		};

		getGear();
		getBrand();


		var addGear = function () {
		    sendRequest.send(
		        'PUT',
                'users/'+ $cookieStore.get("username")+'/gears',
                function(result){


                },
                function(error){

                }

            )
        }





		// The following functions are for future uses
		var addComapny = function () {
			sendRequest.send(
				'PUT',
				'company/' + $scope.company,
				function (result) {
					getCompanies();
					$scope.company = "";
					$scope.notice = $scope.company + "has been successfully created";
					$scope.errMsg = null;
				},
				function (error) {
					if (error.status === 406) {
						$scope.notice = $scope.username + " can not be created because of invalid input";
						$scope.errMsg = error.data;
					} else {
						$scope.notice = "An error has occured";
					}
				},
				{
				},
				$cookieStore.get("username"),
				$cookieStore.get("password")
			)
		};

		$scope.editCompany = function (company) {
			$scope.isCreation = false;
			$scope.companies.forEach(function (company) {
				if (company === companies.company) {
					$scope.company = companies.company;
					$scope.description = companies.description;
				}
			});
		};

		$scope.deleteCompany = function (company) {
			sendRequest.send(
				'DELETE',
				'company/' + company,
				function (result) {
					getCompanies();
					$scope.notice = "You have successfully deleted" + company;
				},
				function (error) {
					if (error.status === 406) {
						$scope.notice = "You can't delete yourself";
					} else {
						$scope.notice = "An error has occured"
					}
				},
				null,
				$cookieStore.get("username"),
				$cookieStore.get("password")
			)
		};
	}]);
