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

		$scope.addGear = function () {
		    sendRequest.send(
		        'POST',
                'gears',
                function(result){
                    console.log("ITS GOOD!")
                },
                function(error){
                    console.log("ITS BAD!")
                },
                {
                    "id":{ "name":$scope.selectedBrand.id, "type":$scope.selectedModel, "owner":$cookieStore.get("username")},
                    "model": "http://localhost:8080/rest/models/"+$scope.selectedBrand.id + "&" + $scope.selectedModel,
                    "owner": "http://localhost:8080/rest/users/"+$cookieStore.get("username"),
                    "description": $scope.selectedDescription
                },
                $cookieStore.get("username"),
                $cookieStore.get("password")
            )
        };

		$scope.deleteGear = function () {
          sendRequest.send(
              'DELETE',
              'gears',
              function (result) {

              },
              function (error){

              },
              null,
              $cookieStore.get("username"),
              $cookieStore.get("password")
          )
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
