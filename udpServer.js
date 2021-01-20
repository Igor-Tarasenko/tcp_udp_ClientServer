const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (error) => {
    console.log('Error: ' + error);
    server.close();
});

server.on('message', (msg, info) => {
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

    server.send(msg, info.port, 'localhost', error => {
        error ? server.close() : console.log('Data sent !!!');
    });
});

server.on('listening', () => {
    const address = server.address();
    const port = address.port;
    const family = address.family;
    const ipAddress = address.address;
    console.log('Server is listening at port' + port);
    console.log('Server ip :' + ipAddress);
    console.log('Server is IP4/IP6 : ' + family);
});

server.on('close',function(){
    console.log('Socket is closed !');
});

server.bind(2222);

setTimeout(() => {
    server.close();
},50000);
