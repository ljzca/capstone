angular.module('noteKeepr')

.controller("binCtrl",["$scope","$cookieStore","$location","sendRequest", function($scope, $cookieStore, $location, sendRequest){
	
    var getTrushedNotes = function(){
        sendRequest.send(
			'GET',
			'http://localhost:8080/noteKeepr-web/rest/note/trushed',
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				console.log("got all owned notes");
				console.log(result.data);
				$scope.trushedNotes = result.data;
            },
			function (error) {
                $scope.errMsg = "You haven't logged in";
            }
		)};
	
	getTrushedNotes();
	
	$scope.restoreNote = function(noteid){
		sendRequest.send(
			'PUT',
			'http://localhost:8080/noteKeepr-web/rest/note/restore/'+noteid,
			'application/json',
			$cookieStore.get("username"),
			$cookieStore.get("password"),
			null,
			function (result) {
				getTrushedNotes();
            },
			function (error) {
                $scope.errMsg = "You haven't logged in";
            }
		);
	};
	
}]);