var setNavBar;

angular.module('stars')

.controller("navCtrl",["$scope","$cookieStore","$location","$window","sendRequest", function($scope, $cookieStore, $location, $window, sendRequest)
{
	setNavBar = function()
	{
		if($cookieStore.get("username"))
		{		
			if($cookieStore.get("isAdmin"))
			{
				$scope.navbar = [{display:"Profile",url:"#/profile"},
								 {display:"Users",url:"#/admin"},
								 {display:"Records",url:"#/records"},
								 {display:"Upload",url:"#/upload"},
								 {display:"Gear",url:"#/gear"}];
			}
			else
			{
				$scope.navbar = [{display:"Profile",url:"#/profile"},
								 {display:"Records",url:"#/records"},
								 {display:"Upload",url:"#/upload"},
								 {display:"Gear", url:"#/gear"}];
			}
			
			$scope.username = $cookieStore.get("username");
		}
		else
		{
			$location.path("/");
		}
	}
	
	setNavBar();
	 
	$scope.logout = function(){
		$cookieStore.remove("username");
		$cookieStore.remove("password");
		$cookieStore.remove("isAdmin");
		$location.path("#/");
		$scope.navbar = undefined;
		$scope.username = undefined;
	};
	
}]);