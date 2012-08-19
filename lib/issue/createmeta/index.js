var https = require('https');

exports.get = function(options, callback) {

	var params = {
		method: 'GET',
		host: options.config.host,
		path: '/rest/api/2/issue/createmeta/',
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

		response.on('end', function() {
			callback(JSON.parse(body));
		});

		response.on('error', function(e) {
			console.error(e);
		});

	});

	request.end();
}