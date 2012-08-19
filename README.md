# JIRA API wrapper for Node.JS

A library for working with JIRA's RESTful API. No dependencies.
So far the following resources are supported:

	/rest/api/2/issue [GET, POST, PUT, DELETE]
	/rest/api/2/issue/createmeta [GET]

If you wish to contribute please follow the conventions used so far, make a new directory inside ``lib/`` named after the resource you wish to access. Thats it. Enjoy!

# Installation

Install with NPM

	npm install jira-api

In your application, require the library using

	var jira = require('jira-api');

# Usage

Now you're ready to make calls to the API

	var options = {
		config: {
			"username": "someuser",
			"passowrd": "secretpass",
			"host": "/example.com/jira/"
		},
		issueIdOrKey: "123"
	};

	jira.issue.get(options, function(response) {
		console.log(JSON.stringify(response, null, 4));
	});

You can also specify the data to send (in case of POST, PUT etc.)

	var options = {
		config: {
			"username": "someuser",
			"passowrd": "secretpass",
			"host": "example.com/jira/"
		},
		data: {
			fields: {
				project: {
					key: "PROJ999",
				},
				priority: {
					name: "Critical",
				},
				summary: "A short summary of the issue",
				description: "A more elaborate decription of the issue",
				issueType: {
					name: "Improvement"
				},
				assignee: {
					name: "Bob"
				}
			}
		}
	};

	jira.issue.post(options, function(response) {
		console.log(JSON.stringify(response, null, 4));
	});

For a list of available request representations consult the [official API documentation](http://docs.atlassian.com/jira/REST/latest/).