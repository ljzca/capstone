# capstone

This project is a spring boot rest based project.
	Java code is in src/main/java
	src/main/resources/application.properties is the project configuration file
	pom.xml contains project building information
	Web front-end, or static code is in src/main/resources

# JSON standard

After starting the server, HAL (Hypertext Application Language) profile provides most general information of what this system can provide. However, just as a reminder, here is a list of some solutions for possible FAQs.

CRUD mapping
Create: post
Read: get
Update: patch
Delete: delete

Date string format standard
	yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
	E.g. 2011-11-02T02:50:12.208Z

Create a record to associate with a user (owner)
Use post method
	{
        "startTime": "2011-11-02T02:50:12.208Z",
        "endTime": "2011-11-02T02:50:12.208Z",
        "routeData": "12",
        "title": "pp",
        "date": null,
        "description": "1",
        "owner": "http://localhost:8080/rest/users/will" // use the url to reference
	}

