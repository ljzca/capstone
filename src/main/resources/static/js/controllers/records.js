/**
 * 
 * This JavaScript file controls the record.html page
 * @author Matthew Rose
 * 
 */

//Predefine the function
var setHeading;
var createFilter;
var alertNum;
var createXY;
var clickIndex;
var myBarChart;
var setIndex;
var ctx;
var chartDraw = function(){};
var extendCTX;
var globalIndex;

var trashLines;

//Determines whether or not lock the data coming from the graph
var dataLock = 0;

angular.module('stars')

.controller("records",["$scope","$cookieStore","$location","sendRequest", "$timeout", function($scope, $cookieStore, $location, sendRequest, $timeout)
{
	setNavBar();
	console.log($cookieStore.get("username"));
	var freezeData = function()
	{
		if($scope.recordName === undefined)
		{
			globalIndex = undefined;
			chartDraw(undefined);
		}
	};
	
	freezeData();
	
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
		
		globalIndex = undefined;
		$scope.storedAltitude = null;
		
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
				
				trashLines = 1;
				
				//---------------------------------------------------------
				//-------------- Create the graph ----------------
				//---------------------------------------------------------
				
				
				//Create the date based on the url to the recordData
				console.log("The Records")
				console.log($scope.records);
		    	var date = new Date(parseInt($scope.records._embedded.recordDatas[0]._links.recordData.href.substring
						(
								$scope.records._embedded.recordDatas[0]._links.recordData.href.lastIndexOf("&") +1
						)));
		    	
		    	var dateString = date.toString();
		    	
		    	var dateMili = date.getTime();
		    	
		    	dateString = date.toString();
		    	
		    	//Set the recordDate as a toString of "date" up to the point where it says GMT
		    	$scope.recordDate = dateString.substring(0, dateString.indexOf("GMT"));
				
		    	/**
		    	 * 
		    	 * Create the X Y axis for the graph
		    	 * 
		    	 */
		    	createXY = function()
		    	{
					//Holds the x-axis
					var xAxis = [];
					
					//Holds the y-axis
					var yAxis = [];
					
					
					
					//Push the x and y data points for each recordData
					for(var i = 0; i < $scope.records._embedded.recordDatas.length; i++)
					{
						date = new Date(parseInt($scope.records._embedded.recordDatas[i]._links.recordData.href.substring
								(
										$scope.records._embedded.recordDatas[i]._links.recordData.href.lastIndexOf("&") +1
								)));
						
						//Set dateString to be a time from 0
						dateString = date.getTime() - dateMili;
						
						//Create a date from the dateString
						var newDate = new Date(dateString);
						
						//Convert dateString to a JSON date from newDate
						dateString = newDate.toJSON();
						
						//Push the xAxis data to the array 
						var xAxisData;
						
//						var baseDistance = 
//						
//						switch($scope.filterSetting)
//						{
//							case "1": 
//								xAxisData = newDate.toJSON().substring(dateString.indexOf("T")+1, dateString.indexOf("T") + 12);
//								break;
//							case "2":
//								var R = 6371e3; // metres
//								var latRad1 = lat1.toRadians();
//								var latRad2 = lat2.toRadians();
//								var latDis = (lat2-lat1).toRadians();
//								var lonDis = (lon2-lon1).toRadians();
//
//								var a = Math.sin(latDis/2) * Math.sin(latDis/2) +
//								        Math.cos(latRad1) * Math.cos(latRad2) *
//								        Math.sin(lonDis/2) * Math.sin(lonDis/2);
//								var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//
//								var d = R * c;
//								
//								
//								
//								xAxisData = $scope.records._embedded.recordDatas[i].lat;
//								break;
//							default:
//								yAxisData = newDate.toJSON().substring(dateString.indexOf("T")+1, dateString.indexOf("T") + 12);
//								break;
//						}
						
						
						xAxis.push
						(
								newDate.toJSON().substring(dateString.indexOf("T")+1, dateString.indexOf("T") + 12)
						);
						
						//Push the yAxis to the array
						var yAxisData;
						switch($scope.filterSetting)
						{
							case "1": 
								yAxisData = $scope.records._embedded.recordDatas[i].altitude;
								break;
							case "2": 
								yAxisData = $scope.records._embedded.recordDatas[i].latitude;
								break;
							case "3": 
								yAxisData = $scope.records._embedded.recordDatas[i].longitude;
								break;
							default:
								yAxisData = $scope.records._embedded.recordDatas[i].altitude;
								break;
						}
						
						yAxis.push(yAxisData);
					}
					// ----------------------------------------------------------------------------------------------
					if($scope.recordName === undefined)
					{
						dataLock = 0;
						freezeData();
						chartDraw(undefined);
					}
					//Set the name of the record to display to the user
			    	$scope.recordName = recordName;
			    	
			    	//Set the description of the record to display to the user
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
			    				
			    	
			    	//Create the graph using the x and y axis
					createGraph(xAxis, yAxis);
		    	
					if(trashLines === 1)
					{
						chartDraw(globalIndex);
						dataLock = 0;
						freezeData();
					}
					
					else
					{
						chartDraw(globalIndex);
					}
		    	}
				
		    	createXY();
		    	
				//---------------------------------------------------------
				//------------------- Create the map ----------------------
				//---------------------------------------------------------
				
				
				//Set the max and min Lat and Lon values to the first record coordinates
				maxLat = $scope.records._embedded.recordDatas[0].latitude;
				minLat = $scope.records._embedded.recordDatas[0].latitude;
				maxLon = $scope.records._embedded.recordDatas[0].longitude;
				minLon = $scope.records._embedded.recordDatas[0].longitude;
				
				//Push the coordinates to the coordiantes array and determine the max and min Lat and Lon values
				for(var i = 0; i < $scope.records._embedded.recordDatas.length; i++)
				{					
					//Pushing each coordinate set to coordinates[]
					coordinates.push(
							{	
								lat:$scope.records._embedded.recordDatas[i].latitude,
								lng:$scope.records._embedded.recordDatas[i].longitude
							}
						);
					
					//Check for max and min Latitude
					if($scope.records._embedded.recordDatas[i].latitude > maxLat)
						maxLat = $scope.records._embedded.recordDatas[i].latitude;
					else if($scope.records._embedded.recordDatas[i].latitude < minLat)
						minLat = $scope.records._embedded.recordDatas[i].latitude;
					
					//Check for max and min Longitude
					if($scope.records._embedded.recordDatas[i].longitude > maxLon)
						maxLon = $scope.records._embedded.recordDatas[i].longitude;
					else if($scope.records._embedded.recordDatas[i].longitude < minLon)
						minLon = $scope.records._embedded.recordDatas[i].longitude;	
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
		)
    };
		
		
		/**
		 * 
		 * Creates the graph to display data
		 * 
		 */
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
				chartDraw(undefined);

				divTag.removeChild(removeCanvas);
			}
			else
			{
				createFilter();
				$scope.filterSetting = 1;
			}
			
			//Create a <canvas> element
			canvas = document.createElement("canvas");
			
			//Add the <canvas> element to the "chart" div
			divTag.appendChild(canvas);
			
			//Set the ID of the chart to "myChart"
			document.getElementsByTagName("canvas")[0].setAttribute("id", "myChart");
			
			//Set renderChart to 1 to indicate a chart has been created
			$scope.renderChart = 1;
						
			//Set  the onClick function for the graph
			canvas.onclick = function(evt)
			{
				freezeData = function()
				{
					if(dataLock === 0)
					{
						globalIndex = $scope.index;
						
						if($scope.storedAltitude !== undefined)
						{
							$scope.$apply(function()
							{
								$scope.storedAltitude = "Stored Altitude: " + $scope.records._embedded.recordDatas[$scope.index].altitude;
							});
							
							dataLock = 1;
						}
					}
					else
					{
						globalIndex = undefined;
						$scope.$apply(function()
						{
							$scope.storedAltitude = null;
						})
						
						dataLock = 0;
					}
				}
				freezeData();
					
			};
		
			//Sets the data that the graph will be showing, as well as how it will appear
			var yLabel;
			
			switch($scope.filterSetting)
			{
				case "1":
					yLabel = "Altitude";
					break;
				case "2":
					yLabel = "Latitude";
					break;
				case "3":
					yLabel = "Longitude";
					break;
				default:
					yLabel = "Altitude";
					break;
			}
			
			var data = {
			    labels: labels,
			    datasets: [
			        {
			            label: yLabel,
			            fill: true,
			            lineTension: 0.1,
			            backgroundColor: "rgba(251,151,28,0.41)",
			            borderColor: "rgba(0,0,0,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(60,60,60,1)",
			            pointBackgroundColor:  "rgba(251,151,28,0.41)",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(251,151,28,0.41)",
			            pointHoverBorderColor: "rgba(0,0,0,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: data,
			            spanGaps: false,
			        }
			    ],
			    lineAtIndex: 2
			};
			
			//Configure all of the graphs options
			var config = 
			{
					type:'line',
					data:data, options: 
					{
						responsive: true, 
						maintainAspectRatio: false,
						
						tooltips: {
						      mode: 'index',
						      intersect: false
						    },
						
						//Scales the x-axis labels
						scales: 
						{
				            xAxes: 
				            [{
				                afterTickToLabelConversion: function(data)
				                {
				                    var xLabels = data.ticks;
			
				                    xLabels.forEach(function (labels, i) 
				                    	{
				                        	if (i % 2 == 1){
				                        		xLabels[i] = '';
				                        }
				                    });
				                } 
				            }]   
						}
					}
			}

			
			var originalLineDraw = Chart.controllers.line.prototype.draw;
			
			chartDraw = function(lineIndex)
			{
			  Chart.helpers.extend(Chart.controllers.line.prototype, {
			    draw: function() {
			      originalLineDraw.apply(this, arguments);

			      var chart = this.chart;
			      extendCTX = chart.chart.ctx;

			      var index = chart.config.data.lineAtIndex;
			      if (index) 
			      {
			        var xaxis = chart.scales['x-axis-0'];
			        var yaxis = chart.scales['y-axis-0'];
			        extendCTX.save();
			        extendCTX.beginPath();
			        extendCTX.moveTo(xaxis.getPixelForValue(undefined, lineIndex), yaxis.top);
			        extendCTX.strokeStyle = '#ff0000';
			        extendCTX.lineTo(xaxis.getPixelForValue(undefined, lineIndex), yaxis.bottom);
			        extendCTX.stroke();
			        extendCTX.restore();
			      }
			    }
			  }); 
			}
			
			//Create the chart with the config options
			canvas = document.getElementById("myChart").getContext("2d");
			myBarChart = new Chart(canvas, config);
		};
		
		//Gets the record list to be displayed upon the page loading
		getRecordList();
		
		
		setIndex = function(index)
		{
			$scope.index = index;
		}
		
		
		setHeading= function()
		{	
			$scope.$apply(function()
			{
				$scope.indexData = $scope.records._embedded.recordDatas[$scope.index]
				if($scope.indexData === undefined)
					$scope.heading = 0;
				else
					$scope.heading = $scope.indexData.altitude;
				chartDraw($scope.index);
			});
		}
		
		/**
		 * 
		 * Creates the filter for the view record page
		 * 
		 */
		createFilter= function()
		{
			 var form = document.createElement("FORM");
			    var row = document.createElement("input");
			    var textnode = document.createTextNode("Altitude");

			    var row2 = document.createElement("input");
			    var textnode2 = document.createTextNode("Latitude");

			    var row3 = document.createElement("input");
			    var textnode3 = document.createTextNode("Longitude");

			    form.appendChild(row);
			    form.appendChild(textnode);
			    
			    form.appendChild(row2);
			    form.appendChild(textnode2);
			    
			    form.appendChild(row3);
			    form.appendChild(textnode3);
			    
			    document.getElementById("form").appendChild(form);
			    
			    for(var i = 0; i < 3; i++)
			    {
			    	 document.getElementsByTagName("input")[i].setAttribute("type", "radio");
			    	 document.getElementsByTagName("input")[i].setAttribute("value", "" + (i+1));
			    	 document.getElementsByTagName("input")[i].setAttribute("name", "formTest");
			    	 document.getElementsByTagName("input")[i].setAttribute("onClick", "alertNum();");
			    }
			    
			    if($scope.filterSetting === "1" || $scope.filterSetting == null)
			    {
			    	$scope.filterSetting = "1";
			    	
			    	document.getElementsByTagName("input")[0].setAttribute("checked", "checked");
			    }
		}
		
		
		alertNum = function()
		{
			var testVar;
		    var radios = document.getElementsByName("formTest");
		    for (var i = 0; i < radios.length; i++) {
		        if (radios[i].checked) {
		            testVar = (radios[i].value);
		            break;
		        }
		    }
		    $scope.filterSetting = testVar;
		    
		    trashLines = 0;
		    
			createXY();
		}

}]);


//This function can be called by the Chart.js file
var getValueAtIndexOrDefault = function(value)
{	
	if(dataLock === 0)
	{
		setHeading();
		setIndex(value._index);
	}
}
