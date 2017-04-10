/**
 * 
 * This JavaScript file controls the record.html page
 * 
 * @author Matthew Rose
 * 
 */

// Predefine the function
var setHeading;
var createFilter;
var yAxisRadio;
var createXY;
var clickIndex;
var myBarChart;
var setIndex;
var ctx;
var chartDraw = function(){};
var extendCTX;
var globalIndex;

var trashLines;

// Determines whether or not lock the data coming from the graph
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
	
	// The co-ordinates of the current record
	$scope.coordinates;
	
	// Render a chart from scratch if counter is zero, remove then re-render
	// when 1
	$scope.renderChart=0;
	
	// Gets the list of records to display as a list
	var getRecordList = function () 
	{
        sendRequest.send(
    			'GET',
    			'users/'+ $cookieStore.get('username') + '/records',
    			function (result) 
    			{
    				// Results from query saved into the scope
    				$scope.recordList = result.data;

    				// Array of all record names for the user
    				$scope.recordListArray = [];
    				
    				// Push to the recordListArray all the decoded names of the
					// records
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

	// Initializes Google Maps
	// Coordinates = the record coordinates, maxCoordinates= highest coordinate
	// set , minCoordinates = lowest coordinate set
	var initMap = function(coordinates, maxCoordinates, minCoordinates) 
	{
		// Initialize the map
	    var map = new google.maps.Map(document.getElementById('map'), {
	      center: coordinates[1],
	      mapTypeId: 'terrain'
	    });
	    
	    // Create the record path
	    var flightPath = new google.maps.Polyline({
	      path: coordinates,
	      geodesic: true,
	      strokeColor: '#FF0000',
	      strokeOpacity: 1.0,
	      strokeWeight: 2
	    });

	    // Set the bounds of the map (so that the record fits on the map)
	    var bounds = new google.maps.LatLngBounds();
	    bounds.extend(maxCoordinates);
	    bounds.extend(minCoordinates);
	    
	    // Assign the bounds to the map
	    map.fitBounds(bounds);
	    
	    // Set the flight path onto the map
	    flightPath.setMap(map);
	}
	
    $scope.getRecords = function(recordName)
    {	
    	var divTag = document.getElementById("euler");
// if($scope.renderChart === 1)
// {
// var removeEuler = document.getElementById("eulerDisplay");
// divTag.removeChild(removeEuler);
// }
// init();
    	
    	freezeData();
    	// Create the encoded record name in order to query the database
		var recordEncodedName = encodeURIComponent(recordName);
		
		globalIndex = undefined;
		$scope.storedAltitude = null;
		
		// The max Latitude and Longitude values
		var maxLat,	minLat, maxLon, minLon;
		
        sendRequest.send(
			'GET',
			'records/'+ $cookieStore.get('username') + '&' + recordEncodedName + '/recordData',
			function (result) 
			{
				// Saves the record data into the scope
				$scope.records = result.data;
				
				// Holds the coordinates for the current record
				var coordinates = [];
				
				trashLines = 1;
				
				// ---------------------------------------------------------
				// -------------- Create the graph ----------------
				// ---------------------------------------------------------
				
				
				// Create the date based on the url to the recordData
		    	var date = new Date(parseInt($scope.records._embedded.recordDatas[0]._links.recordData.href.substring
						(
								$scope.records._embedded.recordDatas[0]._links.recordData.href.lastIndexOf("&") +1
						)));
		    	
		    	var dateString = date.toString();
		    	
		    	$scope.dateMili = date.getTime();
		    	
		    	dateString = date.toString();
		    	
		    	// Set the recordDate as a toString of "date" up to the point
				// where it says GMT
		    	$scope.recordDate = dateString.substring(0, dateString.indexOf("GMT"));
				
		    	var degreeToRad = function(deg)
		    	{
		    		return deg * (Math.PI/180);
		    	}
		    	
		    	/**
				 * 
				 * Create the X Y axis for the graph
				 * 
				 */
		    	createXY = function()
		    	{
					// Holds the x-axis
					var xAxis = [];
					
					// Holds the y-axis
					var yAxis = [];
					
					var totalDistance = 0;
					
					// Push the x and y data points for each recordData
					for(var i = 0; i < $scope.records._embedded.recordDatas.length; i++)
					{
						date = new Date(parseInt($scope.records._embedded.recordDatas[i]._links.recordData.href.substring
								(
										$scope.records._embedded.recordDatas[i]._links.recordData.href.lastIndexOf("&") +1
								)));
						
						// Set dateString to be a time from 0
						dateString = date.getTime() - $scope.dateMili;
						
						// Create a date from the dateString
						var newDate = new Date(dateString);
						
						// Convert dateString to a JSON date from newDate
						dateString = newDate.toJSON();
						
						// Push the xAxis data to the array
						var xAxisData;
						
						switch($scope.filterSettingX)
						{
							case "1": 
								xAxisData = newDate.toJSON().substring(dateString.indexOf("T")+1, dateString.indexOf("T") + 12);
								break;
							case "2":
								if(i>0)
								{
									var lat1 = parseFloat($scope.records._embedded.recordDatas[i-1].latitude);
									var lat2 = parseFloat($scope.records._embedded.recordDatas[i].latitude);
									var lon1 = parseFloat($scope.records._embedded.recordDatas[i-1].longitude);
									var lon2 = parseFloat($scope.records._embedded.recordDatas[i].longitude);
									
									var R = 6371; // kilometers
									var dLat = degreeToRad(lat2 - lat1);
									var dLon = degreeToRad(lon2 - lon1);
									
									 var a =    Math.sin(dLat/2) * Math.sin(dLat/2) +
											    Math.cos(degreeToRad(lat1)) * Math.cos(degreeToRad(lat2)) * 
											    Math.sin(dLon/2) * Math.sin(dLon/2); 
									
									 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
									 console.log(totalDistance);
									totalDistance = parseFloat((totalDistance + (R * c)));
								}
								
								xAxisData = totalDistance.toFixed(2) + "km";
									
								break;
							default:
								xAxisData = newDate.toJSON().substring(dateString.indexOf("T")+1, dateString.indexOf("T") + 12);
								break;
						}
						
						
						xAxis.push(xAxisData);
						
						// Push the yAxis to the array
						var yAxisData;
						switch($scope.filterSetting)
						{
							case "3": 
								yAxisData = $scope.records._embedded.recordDatas[i].altitude;
								break;
							case "4": 
								yAxisData = (($scope.records._embedded.recordDatas[i].fvelocity * 18)/5).toFixed(2);
								break;
							case "5": 
								yAxisData = (($scope.records._embedded.recordDatas[i].vvelocity * 18)/5).toFixed(2);
								break;
							case "6": 
								yAxisData = (($scope.records._embedded.recordDatas[i].gvelocity * 18)/5).toFixed(2);
								break;
							case "7": 
								if(i>0)
								{
									var lat1 = parseFloat($scope.records._embedded.recordDatas[i-1].latitude);
									var lat2 = parseFloat($scope.records._embedded.recordDatas[i].latitude);
									var lon1 = parseFloat($scope.records._embedded.recordDatas[i-1].longitude);
									var lon2 = parseFloat($scope.records._embedded.recordDatas[i].longitude);

									
									var R = 6371; // kilometers
									var dLat = degreeToRad(lat2 - lat1);
									var dLon = degreeToRad(lon2 - lon1);
									
									 var a =    Math.sin(dLat/2) * Math.sin(dLat/2) +
											    Math.cos(degreeToRad(lat1)) * Math.cos(degreeToRad(lat2)) * 
											    Math.sin(dLon/2) * Math.sin(dLon/2); 
									
									 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
									 console.log(totalDistance);
									totalDistance = parseFloat((totalDistance + (R * c)));
								}
								
								yAxisData = totalDistance.toFixed(2);
								break;
							case "8": 
								yAxisData = $scope.records._embedded.recordDatas[i].pitch;
								break;
							case "9": 
								yAxisData = $scope.records._embedded.recordDatas[i].yaw;
								break;
							case "10": 
								yAxisData = $scope.records._embedded.recordDatas[i].roll;
								break;
							case "11": 
								yAxisData = $scope.records._embedded.recordDatas[i].aoa;
								break;
							case "12": 
								yAxisData = $scope.records._embedded.recordDatas[i].gratio;
								break;
							case "13": 
								yAxisData = $scope.records._embedded.recordDatas[i].xaccel;
								break;
							case "14": 
								yAxisData = $scope.records._embedded.recordDatas[i].yaccel;
								break;
							case "15": 
								yAxisData = $scope.records._embedded.recordDatas[i].zaccel;
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
					// Set the name of the record to display to the user
			    	$scope.recordName = recordName;
			    	
			    	// Set the description of the record to display to the user
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
			    				
			    	
			    	if($scope.renderChart === undefined || $scope.renderChart === 0)
		    		{
				    	var logoDiv = document.getElementById("logo");
				    	var logoPic = document.getElementById("logoPic");
				    	logoDiv.removeChild(logoPic);
		    		}
			    	
			    	
			    	// Create the graph using the x and y axis
					createGraph(xAxis, yAxis);
		    	
					if(trashLines === 1)
					{
						if(dataLock === 1)
						{
							chartDraw(globalIndex);
							dataLock = 1;
							freezeData();
						}
					}
					
					else
					{
						chartDraw(globalIndex);
					}
		    	}
		    	
		    	if($scope.renderChart === 1)
	    		{
			    	var eulerDiv = document.getElementById("euler");
			    	var eulerDisplay = document.getElementById("eulerDisplay");
			    	eulerDiv.removeChild(eulerDisplay);
	    		}
		    	init();
				
		    	createXY();
		    	
		    	
		    	$scope.yLabel = "Y Axis:";
		    	$scope.xLabel = "X Axis:";
		    	
		    	$scope.timeTitle = "Time: ";
				$scope.altitudeTitle = "Altitude: ";
				$scope.distanceTitle = "Distance: ";
				$scope.aoaTitle = "Angle of Attack: ";
				$scope.fvelocityTitle = "Flight Velocity: ";
				$scope.gratioTitle = "Glide Ratio: ";
				$scope.gvelocityTitle = "Ground Velocity: ";
				$scope.headingTitle = "Heading: ";
				$scope.latitudeTitle = "Latitude: ";
				$scope.longitudeTitle = "Longitude: ";
				$scope.pitchTitle = "Pitch: ";
				$scope.yawTitle = "Yaw: ";
				$scope.rollTitle = "Roll: ";
				$scope.temperatureTitle = "Temperature: ";
				$scope.vvelocityTitle = "Vertical Velocity: ";
				$scope.xaccelTitle = "X Accel: ";
				$scope.yaccelTitle = "Y Accel: ";
				$scope.zaccelTitle = "Z Accel: ";
				
		    	
				// ---------------------------------------------------------
				// ------------------- Create the map ----------------------
				// ---------------------------------------------------------
				
				
				// Set the max and min Lat and Lon values to the first record
				// coordinates
				maxLat = $scope.records._embedded.recordDatas[0].latitude;
				minLat = $scope.records._embedded.recordDatas[0].latitude;
				maxLon = $scope.records._embedded.recordDatas[0].longitude;
				minLon = $scope.records._embedded.recordDatas[0].longitude;
				
				// Push the coordinates to the coordiantes array and determine
				// the max and min Lat and Lon values
				for(var i = 0; i < $scope.records._embedded.recordDatas.length; i++)
				{					
					// Pushing each coordinate set to coordinates[]
					coordinates.push(
							{	
								lat:$scope.records._embedded.recordDatas[i].latitude,
								lng:$scope.records._embedded.recordDatas[i].longitude
							}
						);
					
					// Check for max and min Latitude
					if($scope.records._embedded.recordDatas[i].latitude > maxLat)
						maxLat = $scope.records._embedded.recordDatas[i].latitude;
					else if($scope.records._embedded.recordDatas[i].latitude < minLat)
						minLat = $scope.records._embedded.recordDatas[i].latitude;
					
					// Check for max and min Longitude
					if($scope.records._embedded.recordDatas[i].longitude > maxLon)
						maxLon = $scope.records._embedded.recordDatas[i].longitude;
					else if($scope.records._embedded.recordDatas[i].longitude < minLon)
						minLon = $scope.records._embedded.recordDatas[i].longitude;	
				}
				
				// Create an object to hold the max coordinates
				var maxCoordinates = 
				{
					lat:maxLat,
					lng:maxLon
				}
				
				// Create an object to hold the min coordinates
				var minCoordinates =
				{
					lat:minLat,
					lng:minLon
				}
				
				// Initialize the map passing all coordinates needed
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
			// Holds the HTML element of <canvas>
			var canvas;
			
			// Holds the HTML element with the ID of "chart"
			var divTag = document.getElementById("chart");
			
			// If the chart has been rendered before, remove the chart
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
				$scope.filterSettingX = 1;
			}
			
			// Create a <canvas> element
			canvas = document.createElement("canvas");
			
			// Add the <canvas> element to the "chart" div
			divTag.appendChild(canvas);
			
			// Set the ID of the chart to "myChart"
			document.getElementsByTagName("canvas")[0].setAttribute("id", "myChart");
			
			// Set renderChart to 1 to indicate a chart has been created
			$scope.renderChart = 1;
						
			// Set the onClick function for the graph
			canvas.onclick = function(evt)
			{
				freezeData = function()
				{
					
						if(dataLock === 0)
						{
							globalIndex = $scope.index;
							
								if($scope.storedAltitude !== undefined)
								{
									dataLock = 1;
										$timeout(function()
										{
											$scope.$apply(function()
											{
												$scope.storedAltitude = "Stored Altitude: " + $scope.records._embedded.recordDatas[$scope.index].altitude;
											});
										},0);		
								}	
							
							
						}
						else
						{
							globalIndex = undefined;
							$timeout(function()
							{
								$scope.$apply(function()
								{
									$scope.storedAltitude = null;
								})
							},0);
							
							dataLock = 0;
						}
					
				}
				freezeData();
					
			};
		
			// Sets the data that the graph will be showing, as well as how it
			// will appear
			var yLabel;
			
			switch($scope.filterSetting)
			{
				case "3":
					yLabel = "Altitude (m)";
					break;
				case "4":
					yLabel = "Flight Velocity (km/h)";
					break;
				case "5":
					yLabel = "Vertical Velocity (km/h)";
					break;
				case "6":
					yLabel = "Ground Velocity (km/h)";
					break;
				case "7":
					yLabel = "Distance (km)";
					break;
				case "8":
					yLabel = "Pitch (" + '\xB0' + ")";
					break;
				case "9":
					yLabel = "Yaw (" + '\xB0' + ")";
					break;
				case "10":
					yLabel = "Roll (" + '\xB0' + ")";
					break;
				case "11":
					yLabel = "Angle of Attack (" + '\xB0' + ")";
					break;
				case "12":
					yLabel = "Glide Ratio";
					break;
				case "13":
					yLabel = "X Accel (m/s" +'\xB2' + ")";
					break;
				case "14":
					yLabel = "Y Accel (m/s" +'\xB2' + ")";
					break;
				case "15":
					yLabel = "Z Accel (m/s" +'\xB2' + ")";
					break;
				default:
					yLabel = "Altitude (m)";
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
			
			// Configure all of the graphs options
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
						
						// Scales the x-axis labels
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
			
			/**
			 * 
			 * This function will draw the vertical line on the graph
			 * 
			 */
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
			
			// Create the chart with the config options
			canvas = document.getElementById("myChart").getContext("2d");
			myBarChart = new Chart(canvas, config);
		};
		
		// Gets the record list to be displayed upon the page loading
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
				{
					date = new Date(parseInt($scope.indexData._links.recordData.href.substring
							(
									$scope.indexData._links.recordData.href.lastIndexOf("&") +1
							)));
					
					// Set dateString to be a time from 0
					dateString = date.getTime() - $scope.dateMili;
					
					// Create a date from the dateString
					var newDate = new Date(dateString);
					
					// Convert dateString to a JSON date from newDate
					dateString = newDate.toJSON();
					
					$scope.time = newDate.toJSON().substring(dateString.indexOf("T")+1, dateString.indexOf("T") + 12);
					$scope.altitude = $scope.indexData.altitude + " m";
					$scope.distance = $scope.indexData.distance.toFixed(2) + " km";
					$scope.aoa = $scope.indexData.aoa + '\xB0';
					$scope.fvelocity = (($scope.indexData.fvelocity * 18)/5).toFixed(2) + " km/h";
					$scope.gratio = $scope.indexData.gratio;
					$scope.gvelocity = (($scope.indexData.gvelocity * 18)/5).toFixed(2) + " km/h";
					$scope.heading = $scope.indexData.heading + '\xB0';
					$scope.latitude = $scope.indexData.latitude + '\xB0';
					$scope.longitude = $scope.indexData.longitude + '\xB0';
					$scope.pitch = $scope.indexData.pitch + '\xB0';
					$scope.yaw = $scope.indexData.yaw + '\xB0';
					$scope.roll = $scope.indexData.roll + '\xB0';
					$scope.temperature = $scope.indexData.temperature + '\xB0' + 'C';
					$scope.vvelocity = (($scope.indexData.vvelocity * 18)/5).toFixed(2) + " km/h";
					$scope.xaccel = $scope.indexData.xaccel + " m/s" + '\xB2';
					$scope.yaccel = $scope.indexData.yaccel + " m/s" + '\xB2';
					$scope.zaccel = $scope.indexData.zaccel + " m/s" + '\xB2';
					
					setEuler($scope.indexData.pitch, $scope.indexData.roll, $scope.indexData.yaw);
					animate();
					
					
				}
				
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
			 // *****************************************
		    
		    var formX = document.createElement("FORM");
		    var rowX = document.createElement("input");
		    var textnodeX = document.createTextNode("Time");

		    var row2X = document.createElement("input");
		    var textnode2X = document.createTextNode("Distance");

		    formX.appendChild(rowX);
		    formX.appendChild(textnodeX);
		    
		    formX.appendChild(row2X);
		    formX.appendChild(textnode2X);
		    
		    document.getElementById("formX").appendChild(formX);
		    
		    for(var i = 0; i < 2; i++)
		    {
		    	 document.getElementsByTagName("input")[i].setAttribute("type", "radio");
		    	 document.getElementsByTagName("input")[i].setAttribute("value", "" + (i+1));
		    	 document.getElementsByTagName("input")[i].setAttribute("name", "formTestX");
		    	 document.getElementsByTagName("input")[i].setAttribute("onClick", "xAxisRadio();");
		    	 document.getElementsByTagName("input")[i].setAttribute("class", "form-group");
		    		 
		    	 console.log($scope.filterSettingX);
		    }
		    
		    if($scope.filterSettingX === "1" || $scope.filterSettingX == null)
		    {
		    	$scope.filterSettingX = "1";
		    	
		    	document.getElementsByTagName("input")[0].setAttribute("checked", "checked");
		    }
		    // ***************************************
			 var form = document.createElement("FORM");
			
			 
			    var row = document.createElement("input");
			    var textnode = document.createTextNode("Altitude");

			    var row2 = document.createElement("input");
			    var textnode2 = document.createTextNode("Flight Velocity");

			    var row3 = document.createElement("input");
			    var textnode3 = document.createTextNode("Vertical Velocity");
			    
			    var row4 = document.createElement("input");
			    var textnode4 = document.createTextNode("Ground Velocity");

			    var row5 = document.createElement("input");
			    var textnode5 = document.createTextNode("Distance");
			    
			    var row6 = document.createElement("input");
			    var textnode6 = document.createTextNode("Pitch");
			    
			    var row7 = document.createElement("input");
			    var textnode7 = document.createTextNode("Yaw");
			    
			    var row8 = document.createElement("input");
			    var textnode8 = document.createTextNode("Roll");
			    
			    var row9 = document.createElement("input");
			    var textnode9 = document.createTextNode("Angle of Attack");
			    
			    var row10 = document.createElement("input");
			    var textnode10 = document.createTextNode("Glide Ratio");
			    
			    var row11 = document.createElement("input");
			    var textnode11 = document.createTextNode("X Accel");
			    
			    var row12 = document.createElement("input");
			    var textnode12 = document.createTextNode("Y Accel");
			    
			    var row13 = document.createElement("input");
			    var textnode13 = document.createTextNode("Z Accel");
			    
			    
			    form.appendChild(row);
			    form.appendChild(textnode);
			    
			    form.appendChild(row2);
			    form.appendChild(textnode2);
			    
			    form.appendChild(row3);
			    form.appendChild(textnode3);
			    
			    form.appendChild(row4);
			    form.appendChild(textnode4);
			    
			    form.appendChild(row5);
			    form.appendChild(textnode5);
			    
			    form.appendChild(row6);
			    form.appendChild(textnode6);
			    
			    form.appendChild(row7);
			    form.appendChild(textnode7);
			    
			    form.appendChild(row8);
			    form.appendChild(textnode8);
			    
			    form.appendChild(row9);
			    form.appendChild(textnode9);
			    
			    form.appendChild(row10);
			    form.appendChild(textnode10);
			    
			    form.appendChild(row11);
			    form.appendChild(textnode11);
			    
			    form.appendChild(row12);
			    form.appendChild(textnode12);
			    
			    form.appendChild(row13);
			    form.appendChild(textnode13);
//			    
			    document.getElementById("form").appendChild(form);
// document.getElementsByTagName("FORM")[0].setAttribute("class", "form-group");
//			    
			    for(var i = 2; i < 15; i++)
			    {
			    	 document.getElementsByTagName("input")[i].setAttribute("type", "radio");
			    	 document.getElementsByTagName("input")[i].setAttribute("value", "" + (i+1));
			    	 document.getElementsByTagName("input")[i].setAttribute("name", "formTest");
			    	 document.getElementsByTagName("input")[i].setAttribute("onClick", "yAxisRadio();");
			    }
			    
			    if($scope.filterSetting === "1" || $scope.filterSetting == null)
			    {
			    	$scope.filterSetting = "1";
			    	
			    	document.getElementsByTagName("input")[2].setAttribute("checked", "checked");
			    }
		}
		
		
		/**
		 * This function reads the y-axis radio buttons
		 */
		yAxisRadio = function()
		{
			var radioValue;
		    var radios = document.getElementsByName("formTest");
		    for (var i = 0; i < radios.length; i++) {
		        if (radios[i].checked) {
		            radioValue = (radios[i].value);
		            break;
		        }
		    }
		    $scope.filterSetting = radioValue;
		    
		    trashLines = 0;
		    
			createXY();
		}
		
		
		/**
		 * This function reads the x-axis radio buttons
		 */
		xAxisRadio = function()
		{
			var radioValue;
		    var radios = document.getElementsByName("formTestX");
		    for (var i = 0; i < radios.length; i++) {
		        if (radios[i].checked) {
		            radioValue = (radios[i].value);
		            break;
		        }
		    }
		    $scope.filterSettingX = radioValue;
		    console.log("here");
		    console.log($scope.filterSettingX);
		    trashLines = 0;
		    
			createXY();
		}

}]);


/**
 * This function can be called by the Chart.js file
 */
var getValueAtIndexOrDefault = function(value)
{	
	if(dataLock === 0)
	{
		setHeading();
		setIndex(value._index);
	}
}
