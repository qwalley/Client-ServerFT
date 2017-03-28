// filename: client.js
// author: Will Alley

var net = require('net');
var fs = require('fs');
var buffer = require('buffer');

const FILEPATH = './downloads/';
var fileIncoming = false;
var client = new net.Socket();

client.connect(9001, '127.0.0.1', function() {
    console.log('Connected\n');
    client.write('HELLO');
    console.log('sent: \'HELLO\'');
});

client.on('data', function(data) {

    // write fileStream to downloads
    if (fileIncoming) {
        console.log('download beginning...')
        
        var writeStream = fs.createWriteStream(FILEPATH + 'afile.txt');
        writeStream.write(data);
        // BAD:
        /* writeStream.end(data, function() {
            client.write('ACK');
            console.log('...download complete')
            console.log('sent: ACK');
        }); */
        client.write('ACK');
        console.log('...download complete')
        // BAD: console.log('sent: ACK');
    }
    // server indicates that next data is fileStream
    else if (data == 'FTR') {
        console.log('received: FTR');
        fileIncoming = true;
    }
    // if server responds, requests desired file
    else if (data == 'ACK') {
        console.log('recieved: ACK');
        client.write('afile.txt');
        console.log('sent: \'afile.txt\'');
    }
});

client.on('close', function() {
    console.log('Connection closed');
});