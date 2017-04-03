angular.module('stars')

    .service("logoutService", ['$cookieStore', '$location', function ($cookieStore, $location) {

        this.logout = function () {
        	
        	console.log("user logging out, removing the nav bar...");
        	
        	$cookieStore.remove("username");
    		$cookieStore.remove("password");
    		$cookieStore.remove("isAdmin");
    		$location.path("#/");
        };
    }]);