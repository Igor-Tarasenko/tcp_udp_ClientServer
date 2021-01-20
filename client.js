const net = require('net');
const client = new net.Socket();
const port = 7070;
const host = '127.0.0.1';

client.connect(port, host, () => {
    console.log('Connected');
    console.log('client details');
    var address = client.address();
    var port = address.port;
    var family = address.family;
    var ipAddress = address.address;
    console.log('Client is listening at port' + port);
    console.log('Client is IP4/IP6 : ' + family);
    client.write("Hello From Client IP" + ipAddress);
});

client.setEncoding('utf8');

client.on('data', data => {
    console.log('Server Says : ' + data);
});

client.on('end', () => {
    console.log('Disconnected from server');
});

client.on('close', () => {
    console.log('Connection closed');
});

setTimeout(() =>{
    client.end('Bye bye server');
},5000);
