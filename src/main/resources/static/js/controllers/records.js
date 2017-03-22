angular.module('stars')

.controller("records",["$scope","$cookieStore","$location","sendRequest", function($scope, $cookieStore, $location, sendRequest)
{
	//The co-ordinates of the current record
	$scope.coordinates;
	
	//Render a chart from scratch if counter is zero, remove then re-render when 1
	$scope.renderChart=0;
	
	//Gets the list of records to display as a list
	var getRecordList = function () 
	{
        sendRequest.send(
    			'GET',
    			'users/'+ $cookieStore.get('username') + '/records',
    			function (result) 
    			{
    				//Results from query saved into the scope
    				$scope.recordList = result.data;

    				//Array of all record names for the user
    				$scope.recordListArray = [];
    				
    				//Push to the recordListArray all the decoded names of the records
    				for(var i = 0; i < $scope.recordList._embedded.records.length; i++)
    				{
    					var s = $scope.recordList._embedded.records[i]._links.record.href;
    					
    				    $scope.recordListArray.push(decodeURIComponent(s.substring(s.indexOf("&")+1)));
    				}
                },
    			function (error) 
    			{
                	console.log("It Failed");
                    $scope.errMsg = "You haven't logged in";
                },
                null,
            	$cookieStore.get('username'),
        		$cookieStore.get('password')
    		);
    }

	//Initializes Google Maps
	//Coordinates = the record coordinates, maxCoordinates= highest coordinate set , minCoordinates = lowest coordinate set 
	var initMap = function(coordinates, maxCoordinates, minCoordinates) 
	{
		//Initialize the map
	    var map = new google.maps.Map(document.getElementById('map'), {
	      center: coordinates[1],
	      mapTypeId: 'terrain'
	    });
	    
	    //Create the record path
	    var flightPath = new google.maps.Polyline({
	      path: coordinates,
	      geodesic: true,
	      strokeColor: '#FF0000',
	      strokeOpacity: 1.0,
	      strokeWeight: 2
	    });

	    //Set the bounds of the map (so that the record fits on the map)
	    var bounds = new google.maps.LatLngBounds();
	    bounds.extend(maxCoordinates);
	    bounds.extend(minCoordinates);
	    
	    //Assign the bounds to the map
	    map.fitBounds(bounds);
	    
	    //Set the flight path onto the map
	    flightPath.setMap(map);
	}
	
    $scope.getRecords = function(recordName)
    {	
    	//Create the encoded record name in order to query the database
		var recordEncodedName = encodeURIComponent(recordName);
		
		//The max Latitude and Longitude values
		var maxLat,	minLat, maxLon, minLon;
		
        sendRequest.send(
			'GET',
			'records/'+ $cookieStore.get('username') + '&' + recordEncodedName + '/recordData',
			function (result) 
			{
				//Saves the record data into the scope
				$scope.records = result.data;
				
				//Holds the coordinates for the current record
				var coordinates = [];
				
				
				//---------------------------------------------------------
				//-------------- Create the altitude graph ----------------
				//---------------------------------------------------------
				
				
				//Create the date based on the url to the recordData
		    	var date = new Date(parseInt($scope.records._embedded.recordDatas[0]._links.recordData.href.substring
						(
								$scope.records._embedded.recordDatas[0]._links.recordData.href.lastIndexOf("&") +1
						)));
		    	
		    	var dateString = date.toString();
		    	
		    	dateString = date.toString();
		    	
		    	//Set the recordDate as a toStrinf of "date" up to the point where it says GMT
		    	$scope.recordDate = dateString.substring(0, dateString.indexOf("GMT"));
				
				//Holds the x-axis
				var time = [];
				
				//Holds the y-axis
				var hmsl = [];
				
				//Push the x and y data points for each recordData
				for(var i = 0; i < $scope.records._embedded.recordDatas.length; i++)
				{
					date = new Date(parseInt($scope.records._embedded.recordDatas[i]._links.recordData.href.substring
							(
									$scope.records._embedded.recordDatas[i]._links.recordData.href.lastIndexOf("&") +1
							)));
					
					dateString = date.toJSON();

					time.push
					(
							dateString.substring(dateString.indexOf("T")+1, dateString.indexOf("T") + 12)
					);
					
//					time.push(i);
					hmsl.push($scope.records._embedded.recordDatas[i].hmsl);
				}
				
				//Set the name of the record to display to the user
		    	$scope.recordName = recordName;
		    	
		    	//Set the description of the record to display to the user
		    	console.log($scope.records);
		    	sendRequest.send(
		    				'GET',
		    				'records/'+ $cookieStore.get('username') + '&' + recordEncodedName,
		    				function (result) 
		    				{
		    					$scope.description = result.data.description;
		    				},
		    				function (error) 
		        			{
		                    	console.log("It Failed");
		                        $scope.errMsg = "You haven't logged in";
		                    },
		                    null,
		                	$cookieStore.get('username'),
		            		$cookieStore.get('password')
		        		);
		    				
		    	
		    	//Create the graph using time and hmsl
				createGraph(time, hmsl);
				
				
				//---------------------------------------------------------
				//------------------- Create the map ----------------------
				//---------------------------------------------------------
				
				
				//Set the max and min Lat and Lon values to the first record coordinates
				maxLat = $scope.records._embedded.recordDatas[0].lat;
				minLat = $scope.records._embedded.recordDatas[0].lat;
				maxLon = $scope.records._embedded.recordDatas[0].lon;
				minLon = $scope.records._embedded.recordDatas[0].lon;
				
				//Push the coordinates to the coordiantes array and determine the max and min Lat and Lon values
				for(var i = 0; i < $scope.records._embedded.recordDatas.length; i++)
				{					
					//Pushing each coordinate set to coordinates[]
					coordinates.push(
							{	
								lat:$scope.records._embedded.recordDatas[i].lat,
								lng:$scope.records._embedded.recordDatas[i].lon
							}
						);
					
					//Check for max and min Latitude
					if($scope.records._embedded.recordDatas[i].lat > maxLat)
						maxLat = $scope.records._embedded.recordDatas[i].lat;
					else if($scope.records._embedded.recordDatas[i].lat < minLat)
						minLat = $scope.records._embedded.recordDatas[i].lat;
					
					//Check for max and min Longitude
					if($scope.records._embedded.recordDatas[i].lon > maxLon)
						maxLon = $scope.records._embedded.recordDatas[i].lon;
					else if($scope.records._embedded.recordDatas[i].lon < minLon)
						minLon = $scope.records._embedded.recordDatas[i].lon;	
				}
				
				//Create an object to hold the max coordinates
				var maxCoordinates = 
				{
					lat:maxLat,
					lng:maxLon
				}
				
				//Create an object to hold the min coordinates
				var minCoordinates =
				{
					lat:minLat,
					lng:minLon
				}
				
				//Initialize the map passing all coordinates needed
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
		
		
		//Creates the graph to display data
		var createGraph = function(labels, data)
		{
			//Holds the HTML element of <canvas>
			var canvas;
			
			//Holds the HTML element with the ID of "chart"
			var divTag = document.getElementById("chart");
			
			//If the chart has been rendered before, remove the chart
			if($scope.renderChart == 1)
			{
				var removeCanvas = document.getElementById("myChart");
				divTag.removeChild(removeCanvas);
			}
		
			//Create a <canvas> element
			canvas = document.createElement("canvas");
			
			//Add the <canvas> element to the "chart" div
			divTag.appendChild(canvas);
			
			//Set the ID of the chart to "myChart"
			document.getElementsByTagName("canvas")[0].setAttribute("id", "myChart");
			
			//Set renderChart to 1 to indicate a chart has been created
			$scope.renderChart = 1;
		
			//Sets the data that the graph will be showing, as well as how it will appear
			var data = {
			    labels: labels,
			    datasets: [
			        {
			            label: "Altitude",
			            fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(75,192,192,0.4)",
			            borderColor: "rgba(75,192,192,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(75,192,192,1)",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: data,
			            spanGaps: false,
			        }
			    ]
			};

			//Create the chart and add the data variable, as well add more additional options
			var myBarChart = Chart.Line(canvas,{data:data, options: 
				{
					responsive: true, 
					maintainAspectRatio: false,
					
					//Scales the x-axis labels
					scales: 
					{
			            xAxes: [{
			                afterTickToLabelConversion: function(data){
			                    var xLabels = data.ticks;
		
			                    xLabels.forEach(function (labels, i) {
			                        if (i % 2 == 1){
			                            xLabels[i] = '';
			                        }
			                    });
			                } 
			            }]   
		        }}});
		};
		
		//Gets the record list to be displayed upon the page loading
		getRecordList();
}]);