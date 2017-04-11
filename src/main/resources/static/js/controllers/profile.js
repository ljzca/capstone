angular.module('stars')

    .controller("profCtrl", ["$scope", "$cookieStore", "$location", "sendRequest", function ($scope, $cookieStore, $location, sendRequest) {

        setNavBar();

        $scope.username = $cookieStore.get("username");

        $scope.gender = {
            code: 'Unknown',
            genders: [
                {id: 'Male', name: 'Male'},
                {id: 'Female', name: 'Female'},
                {id: 'Other', name: 'Other'},
                {id: 'Unknown', name: 'Unknown'}
            ]
        };

        //when the brand is selected, connect selection action to a function that sends a http request to query all models of that brand.

        var selfReflect = function () {
            sendRequest.send(
                'GET',
                'users/' + $cookieStore.get("username"),
                function (result) {
                    $scope.username = $cookieStore.get("username");
                    $scope.password = $cookieStore.get("password");
                    $scope.email = result.data.email;
                    $scope.firstname = result.data.firstname;
                    $scope.lastname = result.data.lastname;
                    $scope.gender.code = result.data.sex;
                    $scope.height = result.data.height;
                    $scope.weight = result.data.weight;
                },
                function (error) {
                    console.log("Error!");
                    $scope.errMsg = "You didn't login in";
                },
                null,
                $cookieStore.get("username"),
                $cookieStore.get("password")
            )
        };

        selfReflect();

        $scope.updateProfile = function () {

            if ($scope.confirmpassword === $cookieStore.get("password")) {
                sendRequest.send(
                    'PUT',
                    'users/' + $cookieStore.get("username"),
                    function (result) {
                        if ($scope.username === $cookieStore.get("username") && $scope.password && $scope.confirmpassword) {
                            $cookieStore.put("password", $scope.password);
                        }
                        $scope.errMsg = null;
                        $scope.notice = "You have updated your profile";
                        $scope.password = $scope.password;
                        $scope.confirmpassword = "";
                    },
                    function (error) {
                        if (error.status === 406) {
                            console.log(error.data);
                            $scope.errMsg = error.data;
                            $scope.notice = "";
                        } else {
                            $scope.notice = "You haven't logged in";
                        }
                    },
                    {
                        username: $cookieStore.get("username"),
                        password: $scope.password,
                        email: $scope.email,
                        firstname: $scope.firstname,
                        lastname: $scope.lastname,
                        sex: $scope.gender.code,
                        height: $scope.height,
                        weight: $scope.weight
                    },
                    $cookieStore.get("username"),
                    $cookieStore.get("password")
                );
            } else {
                console.log($cookieStore.get('password'));
                console.log($scope.confirmpassword);
                $scope.notice = "Your current password is incorrect!"
            }
        };


    }]);