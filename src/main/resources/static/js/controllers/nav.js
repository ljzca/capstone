angular.module('stars')

.controller("navCtrl",["$scope","$cookieStore","$location","$window","sendRequest", function($scope, $cookieStore, $location, $window, sendRequest){
	
	if($cookieStore.get("username")){
		
		if($cookieStore.get("isAdmin")){
			$scope.navbar = [{display:"Profile",url:"#/profile"},
							 {display:"Users",url:"#/admin"},
							 {display:"Notes",url:"#/note"},
							 {display:"Bin",url:"#/bin"}];
		}else{
			$scope.navbar = [{display:"Profile",url:"#/profile"},
							 {display:"Notes",url:"#/note"},
							 {display:"Bin",url:"#/bin"}];
		}
		
		$scope.username = $cookieStore.get("username");

	}else{
		
	};
	
	$scope.logout = function(){
		$cookieStore.remove("username");
		$cookieStore.remove("password");
		$cookieStore.remove("isAdmin");
		$location.path("#/");
		$window.location.reload();
	};
	
}]);