var https = require('https'),
	mime = require('mime'),
	path = require('path'),
	fs = require('fs'),
    async = require('async');

exports.createmeta = require('./createmeta');

/**
 * [POST] /rest/api/2/issue
 *
 * @param  Object 	{options}
 * @param  Function {callback} the function to execute on success
 */
exports.post = function(options, callback) {
	var boundary = '----------------------------' + Date.now(),
	    payload = {
            head: '',
            data: '',
            tail: '',
            length: 0
        };

	/*
	 * Write the payload for the request
	 */
	function setPayload(callback) {
        if (options.data.file != undefined) {
            async.waterfall([
                // Head
                function (callback) {
                    payload.head = new Buffer('--' + boundary + '\r\n' + 
                        'Content-Disposition: form-data; name="file"; filename="' + path.basename(options.data.file) + '"\r\n' +
                        'Content-Type: ' + mime.lookup(options.data.file) + '\r\n' + 
                        '\r\n');
                    callback(null);
                },
                // Body
                function (callback) {
                    fs.readFile(options.data.file, function (err, data) {
                        payload.data = data;
                        callback(null);
                    });
                },
                // Tail
                function (callback) {
                    payload.tail = new Buffer('\r\n--' + boundary + '--\r\n\r\n');
                    callback(null);
                },
                // Length 
                function (callback) {
                    payload.length = payload.head.length + payload.data.length + payload.tail.length;
                    callback(null);
                }
            ],
            // Result
            function (err) {
                if (err) 
                    callback(err);
                else 
                    callback(null);
            });
        }
        else {
            payload.data = JSON.stringify(options.data);
            payload.length = payload.data.length;
            callback(null);
        }
	}

    /* 
     * Build the request parameters and headers
     */
	function buildRequestParams(callback) {
        var params = {
            method: 'POST',
            host: config.jira.host,
            auth: config.jira.username + ':' + config.jira.password,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        }

		if (options.data.file != undefined) {
            params.headers = {
                'Content-Type': 'multipart/form-data; boundary=' + boundary,
                'X-Atlassian-Token': 'nocheck',
                'Content-Length': payload.length
            }
            params.path = config.jira.path + '/issue/' + options.data.fields.issue.key + '/attachments',

            callback(null, params);
		}
		else {
            params.path = config.jira.path + '/issue/';

			callback(null, params);
		}
	}

    /* 
     * Send the request and get a response
     */
    function sendRequest(params, callback) {
        var responseBody = '',
            request;

        request = https.request(params, function(response) {
            response.on('data', function (chunk) {
                responseBody += chunk;
            });

            response.on('end', function () {
                try {
                    callback(null, JSON.parse(responseBody)); }
                catch (e) {
                    callback(null, responseBody); }
            });

            response.on('error', function (err) {
                callback(err, null);
            });
        });
            
        request.write(payload.head);
        request.write(payload.data);
        request.write(payload.tail);
        request.end();
    }
	
    setPayload(function(err) {
        if (err)
            callback(err, null);
        else {
            buildRequestParams(function (err, params) {
                if (err)
                    callback(err, null);
                else {
                    sendRequest(params, function (err, response) {
                        if (err)
                            callback(err, null);
                        else
                            callback(null, response);
                    });
                }
            });
        }
    });
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
