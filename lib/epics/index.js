var https = require('https');

/**
 * [PUT] /greenhopper/1.0/epics/<epicId>/add
 *
 * @param  Object   {options}
 * @param  Function {callback} the function to execute on success
 */
exports.put = function(options, callback) {

	var params = {
		method: 'PUT',
		host: options.config.host,
		path: '/rest/greenhopper/1.0/epics/' + options.epicId + '/add',
		auth: options.config.username + ':' + options.config.password,
		headers: {
			'content-type': 'application/json',
			'content-length': Buffer.byteLength(JSON.stringify(options.data)),
			'accept': 'application/json'
		}
	};

	var body = '';

	var request = https.request(params, function(response) {

		response.on('data', function(chunk) {
			body += chunk;
		});

		response.on('end', function() {
			callback(null);
		});

		response.on('error', function(e) {
			callback(e);
		});

	});

	request.write(JSON.stringify(options.data));

	request.end();
};