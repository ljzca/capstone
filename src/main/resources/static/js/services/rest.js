angular.module('stars')

.service("sendRequest",['$base64', '$http', 'constants', function ($base64, $http, constants) {

	this.send = function (method, url, username, password, data, sucess, fail) {
		
		var req = {
			method: method,
			url: constants.rootURL + url,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "Basic " + $base64.encode(username + ':' + password),
			},
			data: data
		};
		
        $http(req).then(sucess, fail);
    };
	
}]);