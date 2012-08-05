var request = require('request');

exports.post = function(options, callback) {

	var opts = {
		uri: options.config.host,
		qs: "/rest/api/2/issue/" + options.data.key,
		method: "POST",
		basicAuth: [options.config.username, options.config.password],
		headers: {
			'Accept': 'application/json'
		},
		json: JSON.stringify(options.data)
	};

	request(opts, function(error, response, body) {
		if (error) {
			console.log(error);
		} else {
			if (response.statusCode === 200) {
				callback(body);
			} else {
				console.error(response.statusCode);
			}
		}
	});
}

exports.get = function(options, callback) {

	var opts = {
		uri: options.config.host,
		qs: "/rest/api/2/issue/" + options.issueIdOrKey,
		method: "GET",
		basicAuth: [options.config.username, options.config.password],
		headers: {
			'Accept': 'application/json'
		}
	};

	request(opts, function(error, response, body) {
		if (error) {
			console.log(error);
		} else {
			if (response.statusCode === 200) {
				callback(body);
			} else {
				console.error(response.statusCode);
			}
		}
	});
}

exports.delete = function(options, callback) {

	var opts = {
		uri: options.config.host,
		qs: "/rest/api/2/issue/" + options.issueIdOrKey + '?deleteSubtasks=' + options.deleteSubtasks || false,
		method: "DELETE",
		basicAuth: [options.config.username, options.config.password],
		headers: {
			'Accept': 'application/json'
		}
	};

	request(opts, function(error, response, body) {
		if (error) {
			console.log(error);
		} else {
			if (response.statusCode === 200) {
				callback(body);
			} else {
				console.error(response.statusCode);
			}
		}
	});
}

exports.put = function(options, callback) {

	var opts = {
		uri: options.config.host,
		qs: "/rest/api/2/issue/" + issueIdOrKey,
		method: "PUT",
		basicAuth: [options.config.username, options.config.password],
		headers: {
			'Accept': 'application/json'
		},
		json: JSON.stringify(options.data)
	};

	request(opts, function(error, response, body) {
		if (error) {
			console.log(error);
		} else {
			if (response.statusCode === 200) {
				callback(body);
			} else {
				console.error(response.statusCode);
			}
		}
	});
}