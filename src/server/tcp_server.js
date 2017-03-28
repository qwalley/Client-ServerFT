// filename: server.js
// author: Will Alley

var net = require('net');
var fs = require('fs');
var buffer = require('buffer');

const HOST = '127.0.0.1';
const PORT = '9001';
const FILEPATH = './public/';

var server = net.createServer(function(socket) {
	console.log('server connected');

	// sends a response based a recieved data
	socket.on('data', function(data) {
		var ack = '';
		console.log('recieved: \'' + data + '\'');
		
		// respond to "HELLO"
		if (data == 'HELLO') {
			socket.write('ACK');
			console.log('sent: \'ACK\'');
		}
		// check for filematch
		else if (data == 'afile.txt'){
			var fileStream = fs.createReadStream(FILEPATH + data);
			
			// there is an issue with the file
			fileStream.on('error', function(err){
				console.log(err);
				socket.write('NACK: There was a problem retrieving that file');
				console.log('sent: \'ACK: There was a problem retrieving that file\'');
			});

			// the file is found and opened 
			fileStream.on('open',function() {
				socket.write('FTR');
				console.log('sent: \'FTR\'');
				console.log('sending \'' + data +'\'');
				fileStream.pipe(socket);
				// BAD:
				/*
				var chunk = fileStream.read();
				if (chunk !== null) {	
					socket.write(chunk);
					console.log('file transfer complete');
				}
				*/
			});
		}
		else {
			socket.write('NACK: That file does not exist on our server');
			console.log('sent: \'ACK: That file does not exist on our server\'');
		}
	});

});

server.listen(PORT, HOST, function() {
	console.log('server listen on ' + PORT + '');

	server.on('connection', function() {
		console.log('connection made\n');
	});
});