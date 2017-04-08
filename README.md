# capstone

This project is a spring boot rest based project.
	Java code is in src/main/java
	src/main/resources/application.properties is the project configuration file
	pom.xml contains project building information
	Web front-end, or static code is in src/main/resources


# Development Environment

Code Hosting: GitHub
IDE: Eclipse Neon
Database:
Communication Tool: Slack
Project Management: Target Process
Operating System: Windows 7
Compiler Version: JavaSE-1.8


# GitHub setup with Eclipse:

https://lijianzhao.wordpress.com/2016/09/10/import-modules-within-a-github-repository/

https://lijianzhao.wordpress.com/2016/09/10/display-correct-name-in-a-teamwork/


# Commit process

To commit to remote, which has been changed by others, you need to merge latest changes to your local repo and then perform commit and push. You can follow these steps:

 1. Configure the 'fetch' to fetch the branch you originally pulled from.
 2. Fetch the remote branch.
 3. Merge that remote branch onto your local branch.
 4. Commit the (merge) change in your local repo.
 5. Push the change to the remote repo.

Reference: http://stackoverflow.com/questions/19474186/egit-rejected-non-fast-forward


# Significance of toString() in domain classes

The toString() returned values are used to represent the ID of the domains in URL.


# Examples of JSON data
Add new user:
POST to http://localhost:8080/rest/users
{
	"username":"user4",
	"password":"password",
	"email": "user4@edu.sait.ca",
	"isAdmin": false
}

Add new model of a brand:
POST to http://localhost:8080/rest/models
{
	"id":{
		"name":"Test Brand",
		"type":"XX"
	},
	"name":"http://localhost:8080/rest/brands/Test%20Brand",
	"type":"XX"
}

Update the description of the above model of the brand:
PATCH to http://localhost:8080/rest/models/Test%20Brand&XX
{
	"description":"dd"
}

# JSON standard

After starting the server, HAL (Hypertext Application Language) profile provides most general information of what this system can provide. However, just as a reminder, here is a list of some solutions for possible FAQs.

CRUD mapping
Create: post
Read: get
Update (only given attributes in JSON): patch
Update (all properties a model has): put
Delete: delete

Date string format standard
	yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
	E.g. 2011-11-02T02:50:12.208Z

Create a record to associate with a user (owner)
Use post method
{
	"id":
	{
		"owner":"will",
		"title":"TEST"
	},
	"description":"test description",
	"owner":"http://localhost:8080/rest/users/will"
}