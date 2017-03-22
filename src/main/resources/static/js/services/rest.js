angular.module('stars')

    .service("sendRequest", ['$base64', '$http', 'constants', function ($base64, $http, constants) {

        this.send = function (method, url, sucess, fail, data, username, password) {

            var req = {
                method: method,
                url: constants.rootURL + url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            if (username && password)
                $http.defaults.headers.common.Authorization = "Basic " + $base64.encode(username + ':' + password);

            $http(req).then(sucess, fail);
        };
    }]);