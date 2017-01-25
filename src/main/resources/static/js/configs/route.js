angular.module('noteKeepr')
	
.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: "view/login.html",
                controller: "loginCtrl"
            })
	
	        .when("/bin", {
                templateUrl: "view/bin.html",
                controller: "binCtrl"
            })
	
            .when("/note", {
                templateUrl: "view/note.html",
                controller: "noteCtrl"
            })

            .when("/admin", {
                templateUrl: "view/admin.html",
                controller: "adminCtrl"
            })
		
			.when("/profile", {
                templateUrl: "view/profile.html",
                controller: "profCtrl"
            })
			
			.when("/signup", {
                templateUrl: "view/signup.html",
                controller: "signupCtrl"
            })
	
			.when("/signedup", {
                templateUrl: "view/signedup.html"
            })
	
			.when('/password/:token', {
				templateUrl: 'view/password.html',
				controller: 'passwordCtrl'
			})
	
			.when('/forgot', {
				templateUrl: 'view/forgot.html',
				controller: 'forgotCtrl'
			})
	
            .otherwise({
                templateUrl: "view/404.html"
            })
});