angular.module('stars')

.controller("records",["$scope","$cookieStore","$location","sendRequest", function($scope, $cookieStore, $location, sendRequest)
{
	$scope.coordinates;
	
	var codeAddress = function () 
	{
        sendRequest.send(
    			'GET',
    			'users/'+ $cookieStore.get('username') + '/records',
    			function (result) 
    			{
    				$scope.recordList = result.data;
    				
    				var recordListData = [];

    				$scope.recordListArray = [];
    				
    				for(var i = 0; i < $scope.recordList._embedded.records.length; i++)
    				{
    					var s = $scope.recordList._embedded.records[i]._links.record.href;
    				    $scope.recordListArray.push(decodeURIComponent(s.substring(s.indexOf("&")+1)));
    				}
    				
    				console.log($scope.recordListArray);
                },
    			function (error) 
    			{
                	console.log("It Failed");
                    $scope.errMsg = "You haven't logged in";
                },
                null,
            	$cookieStore.get('username'),
        		$cookieStore.get('password')
    		)
    }

	var initMap = function(coordinates, maxCoordinates, minCoordinates) 
	{
	    var map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 11,
	      center: coordinates[1],
	      mapTypeId: 'terrain'
	    });
	    

	    var flightPath = new google.maps.Polyline({
	      path: coordinates,
	      geodesic: true,
	      strokeColor: '#FF0000',
	      strokeOpacity: 1.0,
	      strokeWeight: 2
	    });

	    var bounds = new google.maps.LatLngBounds();
	    bounds.extend(maxCoordinates);
	    bounds.extend(minCoordinates);
	    
	    map.fitBounds(bounds);
	    flightPath.setMap(map);
	}
	
    $scope.getRecords = function(recordName)
    {		
		var recordEncodedName = encodeURIComponent(recordName);
		var maxLat;
		var minLat;
		var maxLon;
		var minLon;
		
        sendRequest.send(
			'GET',
			'records/'+ $cookieStore.get('username') + '&' + recordEncodedName + '/recordData',
			function (result) 
			{
				$scope.records = result.data;
				
				var coordinates = [];
				
				console.log($scope.records._embedded.recordDatas);
				
				maxLat = $scope.records._embedded.recordDatas[0].lat;
				minLat = $scope.records._embedded.recordDatas[0].lat;
				maxLon = $scope.records._embedded.recordDatas[0].lon;
				minLon = $scope.records._embedded.recordDatas[0].lon;
				
				for(var i = 0; i < $scope.records._embedded.recordDatas.length; i++)
				{					
					coordinates.push(
							{	
								lat:$scope.records._embedded.recordDatas[i].lat,
								lng:$scope.records._embedded.recordDatas[i].lon
							}
						);
					
					if($scope.records._embedded.recordDatas[i].lat > maxLat)
						maxLat = $scope.records._embedded.recordDatas[i].lat;
					else if($scope.records._embedded.recordDatas[i].lat < minLat)
						minLat = $scope.records._embedded.recordDatas[i].lat;
					
					if($scope.records._embedded.recordDatas[i].lon > maxLon)
						maxLon = $scope.records._embedded.recordDatas[i].lon;
					else if($scope.records._embedded.recordDatas[i].lon < minLon)
						minLon = $scope.records._embedded.recordDatas[i].lon;
					
					var maxCoordinates = 
					{
						lat:maxLat,
						lng:maxLon
					}
					
					var minCoordinates =
					{
						lat:minLat,
						lng:minLon
					}
				}

				initMap(coordinates, maxCoordinates, minCoordinates);
            },
			function (error) 
			{
            	console.log("It Failed");
                $scope.errMsg = "You haven't logged in";
            },
            null,
        	$cookieStore.get('username'),
    		$cookieStore.get('password')
		)};
		
		codeAddress();
}]);

