angular.module('stars')

.controller("gearCtrl", ["$scope", "cookieStore", "$location", "$window", "sendRequest", function ($scope, $cookieStore, $location, $window, sendRequest) {

	$scope.company = {
		code: 'U',
		companys: [
           
		           ]
	}
	
	var getCompanies = function(){
		sendRequest.send(
		'GET',
		'company',
		function(result) {
			console.log(result.data);
			$scope.companies = result.data._embedded.companies;
		},
		function(error) {
			$scope.notice = "Unable to retrieve companies.";
		},
		null,
		$cookieStore.get("username"),
		$cookieStore.get("password")
		);
	};
	
	getCompanies();
	
	var addComapny = function(){
		sendRequest.send(
		'PUT',
		'company/'+$scope.company,
		function (result) {
			getComapnies();
			$scope.company = "";
			$scope.notice = $scope.comapny + "has been successfully created";
			$scope.errMsg = null;
		},
		function(error){
			if(error.status===406){
				$scope.notice = $scope.username + " can not be created because of invalid input";
				$scope.errMsg = error.data;
			} else {
				$scope.notice = "An error has occured";
			},
			{
				model: $scope.company,
				description: $scope.description
			},
			$cookieStore.get("username");
			$cookieStore.get("password");
		}
	)};
	
	$scope.editCompany = function(company) {
		$scope.isCreation = false;
		$scope.companies.forEach(function(company){
			if(company === companies.company){
				$scope.company = companies.company;
				$scope.description = companies.description;
			}
		});
	};
	
	$scope.deleteCompany = function(company) {
		sendRequest.send(
		'DELETE',
		'company/'+company,
		function (result) {
			getCompanies();
			$scope.notice = "You have successfully deleted" + company;
		},
		function(error){
			if(error.status===406){
				$scope.notice = "You can't delete yourself";
			} else {
				$scope.notice = "An error has occured"
			}
		},
		null,
		$cookieStore.get("username"),
		$cookieStore.get("password")
	)};
}]);
