var request = require('request');

exports.getApplicationProperties = function(conf, data, callback) {

	if (data.key === undefined) {
		console.log('Incomlete data')
	}

	var options = {
		uri: conf.host,
		qs: "/rest/api/2/application-properties/" + data.key,
		method: "GET",
		basicAuth: [conf.username, conf.password],
		headers: {
			'Accept': 'application/json'
		}
	};

	request(options, function(error, response, body) {
		if (error) {
			console.log(error);
		} else {
			console.log(response.statusCode);
			callback(body);
		}
	});
}

exports.postIssue = function(conf, data, callback) {

	if (data.key === undefined) {
		console.log('Incomlete data')
	}

	var options = {
		uri: conf.host,
		qs: "/rest/api/2/issue/" + data.key,
		method: "POST",
		basicAuth: [conf.username, conf.password],
		headers: {
			'Accept': 'application/json'
		},
		json: JSON.stringify(data)
	};

	request(options, function(error, response, body) {
		if (error) {
			console.log(error);
		} else {
			console.log(response.statusCode);
			callback(body);
		}
	});
}