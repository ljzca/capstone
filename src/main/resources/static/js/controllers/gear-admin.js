angular.module('stars')

    .controller("gearAdminCtrl", function ($scope, $cookieStore, $location, sendRequest, $uibModal) {
        setNavBar();

        $scope.newBrand = {
            name: null,
            description: null
        };

        $scope.newModel = {
            name: null,
            type: null,
            description: null
        };

        //Modal Creation and functionality for creating Brand

        $scope.showCreateBrandModal = function (size) {

            var modelInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'BrandCreate.html',
                controller: function ($scope, $uibModalInstance, newBrand) {
                    $scope.newBrand = newBrand;

                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };

                },
                size: size,
                resolve: {
                    newBrand: function () {
                        return $scope.newBrand;
                    }
                }
            });

            modelInstance.result.then(function () {
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

        //Modal Creation and functionality for creating a Model

        $scope.showCreateModelModal = function (size) {

            var modelInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'ModelCreate.html',
                controller: function ($scope, $uibModalInstance, newModel, sendRequest) {
                    $scope.brands = [];

                    sendRequest.send(
                        'GET',
                        'brands',
                        function (result) {
                            $scope.brands = result.data._embedded.brands;
                        },
                        function (error) {
                            console.log("Error loading brands into modal dropdown");
                        },
                        null,
                        $cookieStore.get("username"),
                        $cookieStore.get("password")
                    );

                    $scope.newModel = newModel;

                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },
                size: size,
                resolve: {
                    newModel: function () {
                        return $scope.newModel;
                    }
                }
            });

            modelInstance.result.then(function () {
                sendRequest.send(
                    'POST',
                    '/models',
                    function (result) {
                        console.log(result);
                    },
                    function (error) {
                        $scope.notice = "There was an error creating the brand"
                    },
                    {
                        id:{"name":$scope.newModel.name.id,"type":$scope.newModel.type},
                        name: "http://localhost:8080/rest/brands/"+encodeURIComponent($scope.newModel.name.id),
                        type: $scope.newModel.type,
                        description: $scope.newModel.description
                    },
                    $cookieStore.get("username"),
                    $cookieStore.get("password")
                );
            }, function () {
                console.log("There was an error");
            });
        };


        $scope.showEditBrandModal = function(brand, size){

            console.log(brand);

            var staticBrand = brand.id;

            var modelInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'BrandEdit.html',
                controller: function ($scope, $uibModalInstance, newBrand) {
                    $scope.newBrand = brand;


                    $scope.ok = function () {
                        $uibModalInstance.close();
                    };
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss();
                    };

                },
                size: size,
                resolve: {
                    newBrand: function () {
                        return $scope.newBrand;
                    }
                }
            });

            modelInstance.result.then(function () {
                console.log(brand);
                console.log(staticBrand);
                sendRequest.send(
                    'PUT',
                    'brands/'+staticBrand,
                    function (result) {
                        console.log(result.data);
                        getBrands();
                    },
                    function (error) {
                        $scope.notice = "There was an error editing the brand"
                    },
                    {
                        name: brand.id,
                        description: brand.description
                    },
                    $cookieStore.get("username"),
                    $cookieStore.get("password")
                )
            }, function () {
            });

        };

        $scope.showEditModelModal = function () {

        }

        //Getting brands to display in table.

        var getBrands = function () {
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
            )
        };

        getBrands();

        //Set the selected brand to display brands models.

        $scope.setSelected = function (selectedBrand) {
            $scope.selected = selectedBrand.id;
            getModels();
        };

        //Get the models for the users

        var getModels = function () {
            sendRequest.send(
                'GET',
                'brands/' + $scope.selected + '/models',
                function (result) {
                    $scope.models = [];
                    for (var i = 0; i < result.data._embedded.models.length; i++) {
                        var resultString = result.data._embedded.models[i]._links.model.href;
                        $scope.models.push(decodeURIComponent(resultString.substring(resultString.indexOf("&") + 1)));
                    }
                },
                function (error) {
                    $scope.notice = "There was an error obtaining the models";
                },
                null,
                $cookieStore.get('username'),
                $cookieStore.get('password')
            )
        };

        //Deleting Brand functionality

        $scope.deleteBrand = function (brandname) {
            sendRequest.send(
                'DELETE',
                'brands/'+ brandname,
                function (result) {
                    getBrands();
                    $scope.notice = "You successfully deleted " + brandname;
                },
                function (error) {
                    if (error.status === 406) {
                        $scope.notice = "You can't delete yourself";
                    } else {
                        $scope.notice = "An error occurred when deleting " + brandname;
                    }
                },
                null,
                $cookieStore.get("username"),
                $cookieStore.get("password")
            )
        };

        //Deleting Model functionality

        $scope.deleteModel = function(modelname){
            console.log(modelname);
            sendRequest.send(
                'GET',
                'brands/'+$scope.selected,
                function(result){

                    sendRequest.send(
                        'DELETE',
                        'models/'+encodeURIComponent(result.data.id + "&" +modelname),
                        function (result) {
                            getModels();
                        },
                        function (error) {
                            console.log("Its bad!");
                        },
                        null,
                        $cookieStore.get("username"),
                        $cookieStore.get("password")
                    );
                },
                function (error) {

                },
                null,
                $cookieStore.get("username"),
                $cookieStore.get("password")
            );
        };

    });