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
POST to http://localhost:8080/rest/users
{
	"username":"user4",
	"password":"password",
	"email": "user4@edu.sait.ca",
	"isAdmin": false
}




