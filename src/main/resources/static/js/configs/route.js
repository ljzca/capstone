angular.module('stars')

    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
    	$routeProvider
            .when("/", {
                templateUrl: "view/login.html",
                controller: "loginCtrl"
            })

            .when("/gearadmin", {
            	templateUrl: "view/admingear.html",
            	controller: "gearAdminCtrl"
            })
            
            .when("/gear", {
                templateUrl: "view/gear.html",
                controller: "gearCtrl"
            })

            .when("/records", {
                templateUrl: "view/records.html",
                controller: "records"
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

            .when('/upload', {
                templateUrl: 'view/uploadfile.html',
                controller: 'upload'
            })

            .otherwise({
                templateUrl: "view/404.html"
            })
    });