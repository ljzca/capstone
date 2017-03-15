angular.module('stars')

.service("sendRequest",['$base64', '$http', 'constants', function ($base64, $http, constants) {

	this.send = function (method, url, data, sucess, fail, username, password) {
		
		if(username === null && password === null){
			var req = {
					method: method,
					url: constants.rootURL + url,
					headers: {
						'Content-Type': 'application/json'
					},
					data: data
			};
		} else {
			var req = {
					method: method,
					url: constants.rootURL + url,
					headers: {
						'Content-Type': 'application/json',
						'Authorization': "Basic " + $base64.encode(username + ':' + password),
					},
					data: data
			};		
		}
		$http(req).then(sucess, fail);
    };
}]);