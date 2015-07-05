var srv = require('http').createServer(handler),
	router = require('./router'),
	io = require('socket.io')(srv),
	constants = require('./shared/constants');

function handler (req, res) {
	var content = '';

	router.resolve(req.url, function (response) {
		if (!response) {
			res.writeHead(404);
			res.end();
			return;
		}

		response.content.on('data', function (chunk) {
			content += chunk;
		})
		.on('end', function () {
			res.writeHead(200, {
				'Content-Type': response.contentType,
				'Content-Length': content.length 
			});
			res.end(content);
		});

	});
}

srv.listen(3000, function () {
	console.log('listening on http://localhost:3000');
});

io.on('connection', function (socket) {
	console.log('server received connection: ' + socket);

	socket.on(constants.appName + '.A', function (data) {
		console.log(data);
	});
});