// filename: client.js
// author: Will Alley

var net = require('net');

var client = new net.Socket();

client.connect(9001, '127.0.0.1', function() {
    console.log('Connected\n');
    client.write('HELLO');
    console.log('sent: \'HELLO\'');
});

client.on('data', function(data) {
    console.log('Received: \'' + data + '\'');

    // if server responds, requests desired file
    if (data == 'ACK') {
        client.write('afile.txt');
        console.log('sent: \'afile.txt\'');
    }
});

client.on('close', function() {
    console.log('Connection closed');
});