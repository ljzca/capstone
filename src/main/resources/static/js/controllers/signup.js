angular.module('stars')

    .controller("signupCtrl", ["$http", "$scope", "$cookieStore", "$location", "sendRequest", function ($http, $scope, $cookieStore, $location, sendRequest) {

    	setNavBar();
    	
    	//Gender drop down properties 
    	$scope.gender =  {
    			code: 'Male',
    			genders: [
    				{id: 'Male', name: 'Male'},
    				{id: 'Female', name: 'Female'}
    			]
    		};

    	//HTTP request method that sends a POST request to the server including the users data from the form. 
        $scope.register = function () {
            sendRequest.send(
                'POST',
                'users',
                function (result) {
                    $location.path("signedup");
                },
                function (error) {
                    if (error.status === 406) {
                        $scope.errMsg = error.data;
                    }
                },
                {
                    username: $scope.username,
                    password: $scope.password,
                    email: $scope.email,
                    firstname: $scope.firstname,
                    lastname: $scope.lastname,
    				sex: $scope.gender.code,
    				height: $scope.height,
    				weight: $scope.weight
                },
                null,
                null
            );
        };
    }]);