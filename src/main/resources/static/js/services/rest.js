angular.module('noteKeepr')

.service("sendRequest",['$base64', '$http', function ($base64, $http) {

	this.send = function (method, url, contentType, username, password, data, sucess, fail) {
		
		var req = {
			method: method,
			url: 'localhost:8080/rest/' + url,
			headers: {
				'Content-Type': contentType,
				'Authorization': "Basic " + $base64.encode(username + ':' + password),
			},
			data: data
		};
		
        $http(req).then(sucess, fail);
    };
	
}]);