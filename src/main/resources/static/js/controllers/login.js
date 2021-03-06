angular.module('stars')

    .controller("loginCtrl", ["$scope", "$cookieStore", "$location", "$window", "sendRequest", function ($scope, $cookieStore, $location, $window, sendRequest) {
    	
        var selfReflect = function (username, password) 
        {
            sendRequest.send(
                'GET',
                'users/' + username,
                function (result) {
                	
                    console.log(result);
                    $cookieStore.put("username", username);
                    $cookieStore.put("password", password);

                    var user = result.data;
                    var isAdmin = false;

               
            		if (user.isAdmin) 
            		{
                        isAdmin = true;
                        $cookieStore.put("isAdmin", isAdmin);

                        //TODO
                        //CHANGE THIS PATH TO REDIRECT TO ADMIN VIEWS ONCE THEY'RE ARE DONE.
                        $location.path("records");
                        //TODO
                        //$location.path("admin");
                    }
            		else 
            		{
                        $location.path("records");
                    }
        	
                   setNavBar();
                    
                    
                },
                function (error) {
                    console.log(error);
                    $scope.errMsg = "invalid username or password";
                },
                null,
                username,
                password
            )
        };

        $scope.login = selfReflect;
        var username = $cookieStore.get("username");
        var password = $cookieStore.get("password");

        if (username && password) {
            console.log("auto logging in");
            $cookieStore.remove("username");
            $cookieStore.remove("password");
            $cookieStore.remove("isAdmin");
            selfReflect(username, password);
        }
    }]);