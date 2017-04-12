/**
 * 
 * This JavaScript file controls the record.html page
 * 
 * @author Matthew Rose
 * 
 */

var setStats; 		// Function that sets the statistics received from Chart.js
var createFilter;	// Creates the filter for the view record page
var createXY;		// Create the X & Y axis for the graph
var setIndex;		// This function sets the index within the controllers scope
var extendCTX;		// Allows the chart to become drawn on with the vertical red line 
var lockableIndex;	// Sets the index to the point on the graph where a user clicks for data freeze
var trashLines;		// Removes the red line if the graph needs to be re-rendered
var lineDraw = function (){};	// This function will draw a vertical red line on the graph
var dataLock = 0; // Determines whether or not lock the data coming from the graph

angular.module('stars')

.controller("records", function ($scope, $cookieStore, $location, sendRequest, $timeout, $uibModal) 
{
	//Set the navigation bar to its appropriate state
    setNavBar();
    
    /**
     * This function will disable the lockableIndex and remove any drawn lines
     */
    var freezeData = function () 
    {
    	// If the record isn't loaded yet
        if ($scope.recordName === undefined) 
        {
            lockableIndex = undefined;
            lineDraw(undefined);
        }
    };

    // Call the previously made variable 
    freezeData();

    // The co-ordinates of the current record
    $scope.coordinates;

    // Render a chart from scratch if counter is zero, remove then re-render
    // when 1
    $scope.renderChart = 0;

    // Gets the list of records to display as a list
    var getRecordList = function () {
        sendRequest.send(
            'GET',
            'users/' + $cookieStore.get('username') + '/records',
            function (result) 
            {
                // Results from query saved into the scope
                $scope.recordList = result.data;

                // Array of all record names for the user
                $scope.recordListArray = [];

                // Push to the recordListArray all the decoded names of the records
                for (var i = 0; i < $scope.recordList._embedded.records.length; i++) 
                {
                	// Get the address of the record
                    var recordAddress = $scope.recordList._embedded.records[i]._links.record.href;

                    // Push the parsed title to the array
                    $scope.recordListArray.push(decodeURIComponent(recordAddress.substring(recordAddress.indexOf("&") + 1)));
                }
            },
            function (error) 
            {
                $scope.errMsg = "You haven't logged in";
            },
            null,
            $cookieStore.get('username'),
            $cookieStore.get('password')
        );
    }

    /**
     * Initializes Google Maps
     * 
     * @param coordinates - The record coordinates
     * @param maxCoordinates - Highest coordinate set
     * @param minCoordinates - Lowest coordinate set 
     */
    var initMap = function (coordinates, maxCoordinates, minCoordinates) 
    {
        // Initialize the map
        var map = new google.maps.Map(document.getElementById('map'), 
        {
            center: coordinates[1],
            mapTypeId: 'terrain'
        });

        // Create the record path and set its appearance
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

    /**
     * This function will display all information relevant to the record
     * @param recordName - The name of the record to be displayed
     */
    $scope.displayRecord = function (recordName) 
    {
    	// Create a variable for the "euler" element
        var divTag = document.getElementById("euler");

        // Remove any locks imposed by freezeData
        freezeData();
        
        // Create the encoded record name in order to query the database
        var recordEncodedName = encodeURIComponent(recordName);

        // Remove the locked index on new display creation
        lockableIndex = undefined;

        // The max Latitude and Longitude values
        var maxLat, minLat, maxLon, minLon;

        sendRequest.send(
            'GET',
            'records/' + $cookieStore.get('username') + '&' + recordEncodedName + '/recordData',
            function (result) 
            {
                // Saves the record data into the scope
                $scope.records = result.data;

                // Holds the coordinates for the current record
                var coordinates = [];

                // Refreshes the red line if the graph is re-rendered
                trashLines = 1;

                // ---------------------------------------------------------
                // ------------------ Create the graph ---------------------
                // ---------------------------------------------------------


                // Create the date based on the URL to the recordData
                var date = new Date(parseInt($scope.records._embedded.recordDatas[0]._links.recordData.href.substring
                (
                    $scope.records._embedded.recordDatas[0]._links.recordData.href.lastIndexOf("&") + 1
                )));

                // Create a human readable string of the date
                var dateString = date.toString();

                // Save the date in milliseconds              
                $scope.dateMili = date.getTime();

                // Set the recordDate as a toString of "date" up to the point where it says GMT
                $scope.recordDate = dateString.substring(0, dateString.indexOf("GMT"));

                var degreeToRad = function (deg) 
                {
                    return deg * (Math.PI / 180);
                }

                /**
				 * Create the X Y axis for the graph
				 */
                createXY = function () 
                {
                    // Holds the x-axis
                    var xAxis = [];

                    // Holds the y-axis
                    var yAxis = [];

                    var totalDistance = 0;

                    // Push the x and y data points for each recordData
                    for (var i = 0; i < $scope.records._embedded.recordDatas.length; i++) {
                        date = new Date(parseInt($scope.records._embedded.recordDatas[i]._links.recordData.href.substring
                        (
                            $scope.records._embedded.recordDatas[i]._links.recordData.href.lastIndexOf("&") + 1
                        )));

                        // Set dateString to be a time from 0
                        dateString = date.getTime() - $scope.dateMili;

                        // Create a date from the dateString
                        var newDate = new Date(dateString);

                        // Convert dateString to a JSON date from newDate
                        dateString = newDate.toJSON();

                        // Array to hold X Axis data
                        var xAxisData;

                        // Check the current type of data that should be displayed on the X Axis
                        switch ($scope.filterSettingX) 
                        {
                            case "1": // Time
                                xAxisData = newDate.toJSON().substring(dateString.indexOf("T") + 1, dateString.indexOf("T") + 12);
                                break;
                            case "2": // Distance
                                xAxisData = $scope.records._embedded.recordDatas[i].distance.toFixed(2) + "km";
                                break;
                            default: // Default to time
                                xAxisData = newDate.toJSON().substring(dateString.indexOf("T") + 1, dateString.indexOf("T") + 12);
                                break;
                        }

                        //Push the data to the X Axis
                        xAxis.push(xAxisData);

                        // Array to hold Y Axis data
                        var yAxisData;
                        
                        // Check the current type of data that should be displayed on the Y Axis
                        switch ($scope.filterSettingY) 
                        {
                            case "3": // Altitude
                                yAxisData = $scope.records._embedded.recordDatas[i].altitude;
                                break;
                            case "4": // Flight Velocity
                                yAxisData = $scope.records._embedded.recordDatas[i].fvelocity.toFixed(2);
                                break;
                            case "5": // Vertical Velocity
                                yAxisData = $scope.records._embedded.recordDatas[i].vvelocity.toFixed(2);
                                break;
                            case "6": // Ground Velocity
                                yAxisData = $scope.records._embedded.recordDatas[i].gvelocity.toFixed(2);
                                break;
                            case "7": // Distance
                                yAxisData = $scope.records._embedded.recordDatas[i].distance.toFixed(2);
                                break;
                            case "8": // Pitch
                                yAxisData = $scope.records._embedded.recordDatas[i].pitch;
                                break;
                            case "9": // Yaw
                                yAxisData = $scope.records._embedded.recordDatas[i].yaw;
                                break;
                            case "10": // Roll
                                yAxisData = $scope.records._embedded.recordDatas[i].roll;
                                break;
                            case "11": // Angle of Attack
                                yAxisData = $scope.records._embedded.recordDatas[i].aoa;
                                break;
                            case "12": // Glide Ratio
                                yAxisData = $scope.records._embedded.recordDatas[i].gratio;
                                break;
                            case "13": // X Acceleration
                                yAxisData = $scope.records._embedded.recordDatas[i].xaccel;
                                break;
                            case "14": // Y Acceleration
                                yAxisData = $scope.records._embedded.recordDatas[i].yaccel;
                                break;
                            case "15": // Z Acceleration
                                yAxisData = $scope.records._embedded.recordDatas[i].zaccel;
                                break;
                            default: // Default to Altitude
                                yAxisData = $scope.records._embedded.recordDatas[i].altitude;
                                break;
                        }
                        
                        //Push the data to the Y Axis
                        yAxis.push(yAxisData);
                    }

                    // If the record name is undefined, reset all data locks
                    if ($scope.recordName === undefined) 
                    {
                        dataLock = 0;
                        freezeData();
                        lineDraw(undefined);
                    }
                    
                    // Set the name of the record to display to the user
                    $scope.recordName = recordName;

                    // Set the description of the record to display to the user
                    sendRequest.send(
                        'GET',
                        'records/' + $cookieStore.get('username') + '&' + recordEncodedName,
                        function (result) 
                        {
                            $scope.description = result.data.description;
                        },
                        function (error) {
                            console.log("It Failed");
                            $scope.errMsg = "You haven't logged in";
                        },
                        null,
                        $cookieStore.get('username'),
                        $cookieStore.get('password')
                    );

                    // If a graph is being rendered for the first time, remove the logo
                    if ($scope.renderChart === undefined || $scope.renderChart === 0) 
                    {
                        var logoDiv = document.getElementById("logo");
                        var logoPic = document.getElementById("logoPic");
                        logoDiv.removeChild(logoPic);
                    }


                    // Create the graph using the x and y axis
                    createGraph(xAxis, yAxis);

                    // If the vertical lines need to be reset (new record)
                    if (trashLines === 1) 
                    {
                    	// Reset the dataLock if it is on
                        if (dataLock === 1) 
                        {
                            lineDraw(lockableIndex);
                            freezeData();
                        }
                    }
                    
                    // If the vertical lines don't need to be reset (change filter)
                    else 
                    {
                        lineDraw(lockableIndex);
                    }
                }

                // If a new record is selected, remove the old euler display
                if ($scope.renderChart === 1) 
                {
                    var eulerDiv = document.getElementById("euler");
                    var eulerDisplay = document.getElementById("eulerDisplay");
                    eulerDiv.removeChild(eulerDisplay);
                }
                
                // Initialize the euler display
                init();

                //Create the X and Y axis
                createXY();
                
                // Display the "Edit" and "Delete" buttons
                $scope.buttonDisplay = true;

                // Sett the X and Y labels for the graph
                $scope.yLabel = "Y Axis:";
                $scope.xLabel = "X Axis:";

                // Set the record stat titles
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


                // Set the max and min Lat and Lon values to the first record coordinates
                maxLat = $scope.records._embedded.recordDatas[0].latitude;
                minLat = $scope.records._embedded.recordDatas[0].latitude;
                maxLon = $scope.records._embedded.recordDatas[0].longitude;
                minLon = $scope.records._embedded.recordDatas[0].longitude;

                // Push the coordinates to the coordiantes array and determine the max and min Lat and Lon values
                for (var i = 0; i < $scope.records._embedded.recordDatas.length; i++) 
                {
                    // Pushing each coordinate set to coordinates[]
                    coordinates.push(
                        {
                            lat: $scope.records._embedded.recordDatas[i].latitude,
                            lng: $scope.records._embedded.recordDatas[i].longitude
                        }
                    );

                    // Check for max and min Latitude
                    if ($scope.records._embedded.recordDatas[i].latitude > maxLat)
                        maxLat = $scope.records._embedded.recordDatas[i].latitude;
                    else if ($scope.records._embedded.recordDatas[i].latitude < minLat)
                        minLat = $scope.records._embedded.recordDatas[i].latitude;

                    // Check for max and min Longitude
                    if ($scope.records._embedded.recordDatas[i].longitude > maxLon)
                        maxLon = $scope.records._embedded.recordDatas[i].longitude;
                    else if ($scope.records._embedded.recordDatas[i].longitude < minLon)
                        minLon = $scope.records._embedded.recordDatas[i].longitude;
                }

                // Create an object to hold the max coordinates
                var maxCoordinates =
                    {
                        lat: maxLat,
                        lng: maxLon
                    }

                // Create an object to hold the min coordinates
                var minCoordinates =
                    {
                        lat: minLat,
                        lng: minLon
                    }

                // Initialize the map passing all coordinates needed
                initMap(coordinates, maxCoordinates, minCoordinates);
            },
            function (error) {
                console.log("It Failed");
                $scope.errMsg = "You haven't logged in";
            },
            null,
            $cookieStore.get('username'),
            $cookieStore.get('password')
        )
    };


    /**
	 * Creates the graph to display data
	 * 
	 * @param labels - The X and Y labels
	 * @param data - The data for the graph
	 */
    var createGraph = function (labels, data) {
        // Holds the HTML element of <canvas>
        var canvas;

        // Holds the HTML element with the ID of "chart"
        var divTag = document.getElementById("chart");

        // If the chart has been rendered before, remove the chart and reset the vertical line
        if ($scope.renderChart == 1) 
        {
            var removeCanvas = document.getElementById("myChart");
            lineDraw(undefined);

            divTag.removeChild(removeCanvas);
        }
        
        // Create the filter and set the default values to 1 for both X and Y
        else 
        {
            createFilter(); 
            $scope.filterSettingX = 1;
            $scope.filterSettingY = 1;
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
        canvas.onclick = function (evt) 
        {
        	// Redefine the freezeData function for better use once the graphs have been generated
            freezeData = function () 
            {
            	// If the user clicks on an dynamic graph, lock the data
                if (dataLock === 0) 
                {
                    lockableIndex = $scope.index;
                    dataLock = 1;
                }
                
                // If the user clicks on a locked graph, unlock the data
                else 
                {
                    lockableIndex = undefined;
                    dataLock = 0;
                }
            }
            
            // Call the newly defined freezeData
            freezeData();

        };

        // Sets the Y label for the graph
        var yLabel;

        switch ($scope.filterSettingY) {
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
                yLabel = "X Accel (m/s" + '\xB2' + ")";
                break;
            case "14":
                yLabel = "Y Accel (m/s" + '\xB2' + ")";
                break;
            case "15":
                yLabel = "Z Accel (m/s" + '\xB2' + ")";
                break;
            default: //Default to Altitude 
                yLabel = "Altitude (m)";
                break;
        }

        // The data to be displayed in the graph and other options
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
                    pointBackgroundColor: "rgba(251,151,28,0.41)",
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
            lineAtIndex: 2	// Allows the vertical line to be rendered
        };

        // Configure additional graph options
        var config =
        {
            type: 'line',
            data: data, options: 
            {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: 
                {
                	mode: 'index',
                	intersect: false
                },

                // Scales the x-axis labels
                scales: 
                {
                    xAxes: 
                	[{
                        afterTickToLabelConversion: function (data) 
                        {
                            var xLabels = data.ticks;

                            xLabels.forEach(function (labels, i) 
                            {
                                if (i % 2 == 1) 
                                {
                                    xLabels[i] = '';
                                }
                            });
                        }
                	}]
                }
            }
        }

        // Defines the graph draw type (for rendering the vertical line)
        var originalLineDraw = Chart.controllers.line.prototype.draw;

        /**
		 * This function will draw the vertical line on the graph
		 * @param lineIndex - The index to put the line on
		 */
        lineDraw = function (lineIndex) 
        {
            // Extend the original line graph to support vertical lines
        	Chart.helpers.extend(Chart.controllers.line.prototype, 
            {
                draw: function () 
                {
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
                        //Set the line to reach the top of the Y Axis
                        extendCTX.moveTo(xaxis.getPixelForValue(undefined, lineIndex), yaxis.top);
                        extendCTX.strokeStyle = '#ff0000';
                        //Set the line to reach the top of the Y Axis
                        extendCTX.lineTo(xaxis.getPixelForValue(undefined, lineIndex), yaxis.bottom);
                        extendCTX.stroke();
                        extendCTX.restore();
                    }
                }
            });
        }

        // Create the chart with the config options
        canvas = document.getElementById("myChart").getContext("2d");
        lineChart = new Chart(canvas, config);
    };

    // Gets the record list to be displayed upon the page loading
    getRecordList();


    /**
     * This function sets the index within the controllers scope
     * @param index - The index to be set
     */
    setIndex = function (index) 
    {
        $scope.index = index;
    }

    /**
     * This function will set the dynamic stats and animate the 3D Euler model
     */
    setStats = function () 
    {
        $scope.$apply(function () 
        {
        	$scope.indexData = null;
        	
        	// Hold the values from the graph at the specified index
            $scope.indexData = $scope.records._embedded.recordDatas[$scope.index];
            
            // When the mouse hovers on the graph 
            if ($scope.indexData != null)
            {
                date = new Date(parseInt($scope.indexData._links.recordData.href.substring
                (
                    $scope.indexData._links.recordData.href.lastIndexOf("&") + 1
                )));

                // Set dateString to be a time from 0
                dateString = date.getTime() - $scope.dateMili;

                // Create a date from the dateString
                var newDate = new Date(dateString);

                // Convert dateString to a JSON date from newDate
                dateString = newDate.toJSON();

                // Set the live stats to their current value and display units
                $scope.time = newDate.toJSON().substring(dateString.indexOf("T") + 1, dateString.indexOf("T") + 12);
                $scope.altitude = $scope.indexData.altitude + " m";
                $scope.distance = $scope.indexData.distance.toFixed(2) + " km";
                $scope.aoa = $scope.indexData.aoa + '\xB0';
                $scope.fvelocity = (($scope.indexData.fvelocity * 18) / 5).toFixed(2) + " km/h";
                $scope.gratio = $scope.indexData.gratio;
                $scope.gvelocity = (($scope.indexData.gvelocity * 18) / 5).toFixed(2) + " km/h";
                $scope.heading = $scope.indexData.heading + '\xB0';
                $scope.latitude = $scope.indexData.latitude + '\xB0';
                $scope.longitude = $scope.indexData.longitude + '\xB0';
                $scope.pitch = $scope.indexData.pitch + '\xB0';
                $scope.yaw = $scope.indexData.yaw + '\xB0';
                $scope.roll = $scope.indexData.roll + '\xB0';
                $scope.temperature = $scope.indexData.temperature + '\xB0' + 'C';
                $scope.vvelocity = (($scope.indexData.vvelocity * 18) / 5).toFixed(2) + " km/h";
                $scope.xaccel = $scope.indexData.xaccel + " m/s" + '\xB2';
                $scope.yaccel = $scope.indexData.yaccel + " m/s" + '\xB2';
                $scope.zaccel = $scope.indexData.zaccel + " m/s" + '\xB2';

                // Animate the 3D Euler model
                setEuler($scope.indexData.pitch, $scope.indexData.roll, $scope.indexData.yaw);
                animate();
            }

            // Draw the vertical red line
            lineDraw($scope.index);

        });
    };

    /**
	 * Creates the filter for the view record page
	 */
    createFilter = function () 
    {
    	// Create a form for the X Axis
        var formX = document.createElement("FORM");
        
        //Create an input tag for each X Axis data type
        var rowX = document.createElement("input");
        var textnodeX = document.createTextNode("Time");

        var row2X = document.createElement("input");
        var textnode2X = document.createTextNode("Distance");

        // Append the inputs to the form
        formX.appendChild(rowX);
        formX.appendChild(textnodeX);

        formX.appendChild(row2X);
        formX.appendChild(textnode2X);

        // Append the form to records.html
        document.getElementById("formX").appendChild(formX);

        // Set the attributes for the X Axis radio buttons
        for (var i = 0; i < 2; i++) 
        {
            document.getElementsByTagName("input")[i].setAttribute("type", "radio");
            document.getElementsByTagName("input")[i].setAttribute("value", "" + (i + 1));
            document.getElementsByTagName("input")[i].setAttribute("name", "formTestX");
            document.getElementsByTagName("input")[i].setAttribute("onClick", "xAxisRadio();");
            document.getElementsByTagName("input")[i].setAttribute("class", "form-group");
        }

        // Set the default radio button selection for X
        if ($scope.filterSettingX === "1" || $scope.filterSettingX == null) 
        {
            $scope.filterSettingX = "1";

            document.getElementsByTagName("input")[0].setAttribute("checked", "checked");
        }
       
       // Create a form for the Y Axis
        var formY = document.createElement("FORM");

        //Create an input tag for each Y Axis data type
        var rowY = document.createElement("input");
        var textnodeY = document.createTextNode("Altitude");

        var row2Y = document.createElement("input");
        var textnode2Y = document.createTextNode("Flight Velocity");

        var row3Y = document.createElement("input");
        var textnode3Y = document.createTextNode("Vertical Velocity");

        var row4Y = document.createElement("input");
        var textnode4Y = document.createTextNode("Ground Velocity");

        var row5Y = document.createElement("input");
        var textnode5Y = document.createTextNode("Distance");

        var row6Y = document.createElement("input");
        var textnode6Y = document.createTextNode("Pitch");

        var row7Y = document.createElement("input");
        var textnode7Y = document.createTextNode("Yaw");

        var row8Y = document.createElement("input");
        var textnode8Y = document.createTextNode("Roll");

        var row9Y = document.createElement("input");
        var textnode9Y = document.createTextNode("Angle of Attack");

        var row10Y = document.createElement("input");
        var textnode10Y = document.createTextNode("Glide Ratio");

        var row11Y = document.createElement("input");
        var textnode11Y = document.createTextNode("X Accel");

        var row12Y = document.createElement("input");
        var textnode12Y = document.createTextNode("Y Accel");

        var row13Y = document.createElement("input");
        var textnode13Y = document.createTextNode("Z Accel");

        // Append the inputs to the form
        formY.appendChild(rowY);
        formY.appendChild(textnodeY);

        formY.appendChild(row2Y);
        formY.appendChild(textnode2Y);

        formY.appendChild(row3Y);
        formY.appendChild(textnode3Y);

        formY.appendChild(row4Y);
        formY.appendChild(textnode4Y);

        formY.appendChild(row5Y);
        formY.appendChild(textnode5Y);

        formY.appendChild(row6Y);
        formY.appendChild(textnode6Y);

        formY.appendChild(row7Y);
        formY.appendChild(textnode7Y);

        formY.appendChild(row8Y);
        formY.appendChild(textnode8Y);

        formY.appendChild(row9Y);
        formY.appendChild(textnode9Y);

        formY.appendChild(row10Y);
        formY.appendChild(textnode10Y);

        formY.appendChild(row11Y);
        formY.appendChild(textnode11Y);

        formY.appendChild(row12Y);
        formY.appendChild(textnode12Y);

        formY.appendChild(row13Y);
        formY.appendChild(textnode13Y);

        // Append the form to records.html
        document.getElementById("formY").appendChild(formY);

        //Set the attributes for the Y Axis radio buttons
        for (var i = 2; i < 15; i++) 
        {
            document.getElementsByTagName("input")[i].setAttribute("type", "radio");
            document.getElementsByTagName("input")[i].setAttribute("value", "" + (i + 1));
            document.getElementsByTagName("input")[i].setAttribute("name", "yAxis");
            document.getElementsByTagName("input")[i].setAttribute("onClick", "yAxisRadio();");
        }

        // Set the default radio button for the Y Axis
        if ($scope.filterSettingY === "1" || $scope.filterSettingY == null) 
        {
            $scope.filterSettingY = "1";

            document.getElementsByTagName("input")[2].setAttribute("checked", "checked");
        }
    };


    /**
	 * This function reads the y-axis radio buttons
	 */
    yAxisRadio = function () 
    {
        var radioValue;
        var radios = document.getElementsByName("yAxis");
        
        // Check the Y Axis radio buttons for if they are selected
        for (var i = 0; i < radios.length; i++) 
        {
            if (radios[i].checked) 
            {
                radioValue = (radios[i].value);
                break;
            }
        }
        
        // Set the filter setting to the selected radio button
        $scope.filterSettingY = radioValue;

        // Don't dispose of the red line if switching axis type
        trashLines = 0;

        // Create the X and Y Axis on the graph
        createXY();
    };


    /**
	 * This function reads the x-axis radio buttons
	 */
    xAxisRadio = function () 
    {
        var radioValue;
        var radios = document.getElementsByName("formTestX");
        
        // Check the X Axis radio buttons for if they are selected
        for (var i = 0; i < radios.length; i++) 
        {
            if (radios[i].checked) 
            {
                radioValue = (radios[i].value);
                break;
            }
        }
        
        // Set the filter setting to the selected radio button
        $scope.filterSettingX = radioValue;
        
        // Don't dispose of the red line if switching axis type
        trashLines = 0;

        // Create the X and Y Axis on the graph
        createXY();
    };

    /**
     * This function will delete a record when the delete button is clicked
     */
    $scope.deleteRecord = function () 
    {
        sendRequest.send(
            'DELETE',
            'records/' + $cookieStore.get("username") + '&' + $scope.recordName,
            function (result) 
            {
            	// Refresh the page after the record is deleted
                location.reload();
            },
            function (error) {},
            null,
            $cookieStore.get("username"),
            $cookieStore.get("password")
        );
    };


    /**
     * This function will edit a record when the edit button is clicked
     */
    $scope.editRecordModal = function (size) 
    {
    	// Sets the scope description to the new description
        var setScopeDescription = function(newDescription)
        {
            $scope.description = newDescription;
        }
        
        // Creates a copy of the original record being edited
        var edittedRecord = 
        {
            title: $scope.recordName,
            description: $scope.description
        }

        // Creates a Modal to edit the record
        var modalInstance = $uibModal.open
        ({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'editRecord.html',
            controller: function ($scope, $uibModalInstance, newRecord) 
            {
            	//Puts the name and description of the record being edited in the scope
                $scope.newRecord = edittedRecord;

                // On the click of the save button
                $scope.ok = function () 
                {
                    $uibModalInstance.close();
                };
                
                // On the click of the cancel button
                $scope.cancel = function () 
                {
                    $uibModalInstance.dismiss();
                };
            },
            size: size,
            resolve: 
            {
                newRecord: function () 
                {
                    return $scope.newRecord;
                }
            }
        });

        // Sends the edited information to the database
        modalInstance.result.then
        (
    		function () 
            {
                //Get the new values of description and the value of title
    			var newName = document.getElementById("rn").value;
                var newDescription = document.getElementById("rd").value;
                
                sendRequest.send(
                    'PATCH',
                    'records/' + $cookieStore.get('username') + '&' + $scope.recordName,
                    function (result) 
                    {
                    	// Set the new description in the scope
                        setScopeDescription(newDescription);
                    },
                    function (error) {
                        console.log('ERROR EDITING');
                    },
                    //Send the new description and name to the database
                    {
                        title: newName,
                        description: newDescription
                    },
                    $cookieStore.get('username'),
                    $cookieStore.get('password')
                );
            }, 
            function (){}
    	);
    };
});


/**
 * This function can be called by the Chart.js file to pass values from the
 * chart to the record.js
 */
var getValueAtIndexOrDefault = function (value) 
{
	//If the dataLock is not on
    if (dataLock === 0) 
    {
    	// Set the dynamic stats
        setStats();
        
        // Set the current index
        setIndex(value._index);
    }
}
