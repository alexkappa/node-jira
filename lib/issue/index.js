var https = require('https');

exports.createmeta = require('./createmeta');

/**
 * [POST] /rest/api/2/issue
 *
 * @param  Object 	{options}
 * @param  Function {callback} the function to execute on success
 */
exports.post = function(options, callback) {

	/*
	 * Building the request parmeters
	 */
	var params = {
		method: 'POST',
		host: options.config.host,
		path: '/rest/api/2/issue/',
		auth: options.config.username + ':' + options.config.password,
		headers: {
			'content-type': 'application/json',
			'content-length': Buffer.byteLength(JSON.stringify(options.data)),
			'accept': 'application/json'
		}
	};

	/*
	 * The response body will fill this variable
	 */
	var body = '';

	/*
	 * Now lets make the actual request
	 */
	var request = https.request(params, function(response) {

		/*
		 * Append returned chunks of data to body variable
		 */
		response.on('data', function(chunk) {
			body += chunk;
		});

		/*
		 * When connection closes execute the callers callback function
		 */
		response.on('end', function() {
			callback(JSON.parse(body));
		});

		/*
		 * Show any errors that occured during the request
		 */
		response.on('error', function(e) {
			console.error(e);
		});

	});

	/*
	 * Write the body of the request with the data suplied by the caller
	 */
	request.write(JSON.stringify(options.data));

	request.end();
};

/**
 * [GET] /rest/api/2/issue/issueIdOrKey
 *
 * @param  Object 	{options}
 * @param  Function {callback} the function to execute on success
 */
exports.get = function(options, callback) {

	var params = {
		method: 'GET',
		host: options.config.host,
		path: '/rest/api/2/issue/' + options.issueIdOrKey,
		auth: options.config.username + ':' + options.config.password,
		headers: {
			'accept': 'application/json'
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
};

/**
 * [DELETE] /rest/api/2/issue/issueIdOrKey
 *
 * @param  Object 	{options}
 * @param  Function {callback} the function to execute on success
 */
exports.delete = function(options, callback) {

	var params = {
		method: 'DELETE',
		host: options.config.host,
		path: '/rest/api/2/issue/' + options.issueIdOrKey + '?deleteSubtasks=' + (options.deleteSubtasks || false),
		auth: options.config.username + ':' + options.config.password,
		headers: {
			'accept': 'application/json'
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
};

/**
 * [PUT] /rest/api/2/issue/issueIdOrKey
 *
 * @param  Object   {options}
 * @param  Function {callback} the function to execute on success
 */
exports.put = function(options, callback) {

	var params = {
		method: 'PUT',
		host: options.config.host,
		path: '/rest/api/2/issue/' + options.issueIdOrKey,
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
			callback(JSON.parse(body));
		});

		response.on('error', function(e) {
			console.error(e);
		});

	});

	request.write(JSON.stringify(options.data));

	request.end();
};