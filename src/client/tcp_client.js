// filename: client.js
// author: Will Alley

var net = require('net');
var fs = require('fs');
var buffer = require('buffer');

const FILEPATH = './downloads/';
var fileIncoming = false;
var isConnected = false;
var serverRes = false;
var filename = '';
var client = new net.Socket();

// if connection succeeds, send HELLO packet
client.connect(9001, '127.0.0.1', function() {
    isConnected = true;
    console.log('Connected\n');
    client.write('HELLO');
    console.log('sent: \'HELLO\'');
});

// only acknoledge user input after ACK has been recieved
process.stdin.on('data', function(input) {
    if (isConnected) {
        if (serverRes) {
            if (input == 'exit') {
                client.write(input);
            }
            filename = input.toString().trim();
            client.write(filename);
            console.log('sent: \'' + filename + '\'');
        }
    }
})

client.on('data', function(data) {

    // write fileStream to downloads
    if (fileIncoming) {
        console.log('download beginning...');
        
        var writeStream = fs.createWriteStream(FILEPATH + 'afile.txt');
        writeStream.end(data, function() {
            fileIncoming = false;
            client.write('ACK');
            console.log('...download complete')
            console.log('sent: ACK');
        }); 
    }
    // server indicates that next data is fileStream
    else if (data == 'FTR') {
        console.log('received: FTR');
        fileIncoming = true;
    }
    // if server responds, allow user input
    else if (data == 'ACK') {
        console.log('recieved: ACK');
        serverRes = true;
    }
    else {
        console.log('recieved: \'' + data + '\'');
    }
});

client.on('close', function() {
    console.log('Connection closed');
    process.exit();
});