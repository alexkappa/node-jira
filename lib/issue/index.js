var https   = require('https');

exports.createmeta = require('./createmeta');

exports.post = function(options, callback) {

	var params = {
		method: 'POST',
		host: options.config.host,
		path: '/rest/api/2/issue/',
		auth: options.config.username + ':' + options.config.password,
		headers: {
			'content-type': 'application/json',
			'content-length': Buffer.byteLength(JSON.stringify(options.data)),
			'accept': 'application/json',
		}
	};

	var body = '';

	var request = https.request(params, function(response) {

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			console.log(body);
			callback(JSON.parse(body));
		});

		response.on('error', function(e) {
			console.error(e);
		});

	});

	request.write(JSON.stringify(options.data));

	request.end();
}

exports.get = function(options, callback) {

	var params = {
		method: 'GET',
		host: options.config.host,
		path: '/rest/api/2/issue/' + options.issueIdOrKey,
		auth: options.config.username + ':' + options.config.password,
		headers: {
			'Accept': 'application/json',
		}
	};

	var body = '';

	var request = https.request(params, function(response) {

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function(){
			callback(JSON.parse(body));
		});

		response.on('error', function(e) {
			console.error(e);
		});

	});

	request.end();

}

exports.delete = function(options, callback) {

	var params = {
		method: 'DELETE',
		host: options.config.host,
		path: '/rest/api/2/issue/' + options.issueIdOrKey + '?deleteSubtasks=' + options.deleteSubtasks || false,
		auth: options.config.username + ':' options.config.password,
		headers: {
			'Accept': 'application/json'
		}
	};

	var request = https.request(params, function(response) {

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function(){
			callback(JSON.parse(body));
		});

		response.on('error', function(e) {
			console.error(e);
		});

	});

	request.end();
}

exports.put = function(options, callback) {

	var params = {
		method: 'PUT',
		host: options.config.host,
		path: '/rest/api/2/issue/' + options.issueIdOrKey,
		auth: options.config.username + ':' options.config.password,
		headers: {
			'content-type': 'application/json',
			'content-length': Buffer.byteLength(JSON.stringify(options.data)),
			'accept': 'application/json',
		}
	};

	var request = https.request(params, function(response) {

	});

	request.write(JSON.stringify(options.data));

	request.end();
}