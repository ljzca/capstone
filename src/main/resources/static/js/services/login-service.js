angular.module('stars')

.service("loginService", ['$cookieStore',function($cookieStore){
	
	this.login = function(isAdmin){

		console.log("user logging in, loading the nav bar...");
		
		if(isAdmin){
			return [{display:"Profile",url:"#/profile"},
			        		{display:"Users",url:"#/admin"},
			        		{display:"Records",url:"#/records"},
			        		{display:"Upload",url:"#/upload"}];
		}else{
			return [{display:"Profile",url:"#/profile"},
							 {display:"Records",url:"#/records"},
							 {display:"Upload",url:"#/upload"}];
		}
		
	};
}]);