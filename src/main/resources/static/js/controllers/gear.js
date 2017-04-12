angular.module('stars')

    .controller('gearCtrl', ["$scope", "$cookieStore", "$location", "$window", "sendRequest", function ($scope, $cookieStore, $location, $window, sendRequest) {

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
        $scope.getModels = function () {
            sendRequest.send(
                'GET',
                'brands/' + $scope.selectedBrand.id + '/models',
                function (result) {
                    console.log(result.data.models);
                    $scope.models = [];
                    for (var i = 0; i < result.data._embedded.models.length; i++) {
                        var resultString = result.data._embedded.models[i]._links.model.href;
                        $scope.models.push(decodeURIComponent(resultString.substring(resultString.indexOf("&") + 1)));
                    }
                },
                function (error) {
                    console.log("getModels Failed");
                }
            )
        };


        $scope.getGearModels = function () {
            sendRequest.send(
                'GET',
                'brands/' + $scope.gear.brand + '/models',
                function (result) {
                    console.log(result.data.models);
                    $scope.models = [];
                    for (var i = 0; i < result.data._embedded.models.length; i++) {
                        var resultString = result.data._embedded.models[i]._links.model.href;
                        console.log(resultString);
                        $scope.models.push(decodeURIComponent(resultString.substring(resultString.indexOf("&") + 1)));
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
                    for (var i = 0; i < result.data._embedded.gears.length; i++) {
                        var resultString = result.data._embedded.gears[i]._links.gear.href;
                        console.log(resultString);
                        resultString = decodeURIComponent(resultString.substring(28));
                        console.log(resultString);
                        var gearString = resultString.split("&");
                        var gearObj = {
                            brand: gearString[0],
                            model: gearString[1],
                            description: result.data._embedded.gears[i].description,
                            id: gearString[3]
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
                function (result) {
                    console.log("ITS GOOD!");
                    getGear();
                },
                function (error) {
                    if (error.status === 409) {
                        $scope.notice = "You cannot create duplicate pieces of gear!"
                    } else {
                        $scope.notice = "There was an error creating your gear!"
                    }
                },
                {
                    "id": {
                        "name": $scope.selectedBrand.id,
                        "type": $scope.selectedModel,
                        "owner": $cookieStore.get("username")
                    },
                    "description": $scope.selectedDescription
                },
                $cookieStore.get("username"),
                $cookieStore.get("password")
            )
        };

        $scope.deleteGear = function (brand, model, id) {

            sendRequest.send(
                'DELETE',
                'gears/' + encodeURIComponent(brand) + "&" + encodeURIComponent(model) + "&" + encodeURIComponent($cookieStore.get("username"))+"&"+id,
                function (result) {
                    console.log("DELETED");
                    getGear();
                },
                function (error) {
                    console.log("ERROR DELETING")
                },
                null,
                $cookieStore.get("username"),
                $cookieStore.get("password")
            )
        };

        $scope.editGear = function (brand,model,description, id) {

            sendRequest.send(
                'PATCH',
                'gears/'+encodeURIComponent(brand)+"&"+encodeURIComponent(model)+"&"+encodeURIComponent($cookieStore.get("username"))+"&"+id,
                function (result) {
                    console.log("ITS GOOD")
                    getGear();
                },
                function (error) {
                    console.log("ERROR EDITING")
                },
                {
                    "id":{
                        "name": brand,
                        "type": model,
                        "owner": $cookieStore.get("username")
                    },
                    "description": description
                },
                $cookieStore.get("username"),
                $cookieStore.get("password")
            )
        };
    }]);
