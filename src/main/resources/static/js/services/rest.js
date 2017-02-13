angular.module('stars')

.service("sendRequest",['$base64', '$http', function ($base64, $http) {

	this.send = function (method, url, username, password, data, sucess, fail) {
		
		var req = {
			method: method,
			url: 'http://localhost:8080/rest/' + url,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "Basic " + $base64.encode(username + ':' + password),
			},
			data: data
		};
		
        $http(req).then(sucess, fail);
    };
	
}]);