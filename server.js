const net = require('net');
const port = 7070;
const host = '127.0.0.1';

const server = net.createServer();
let sockets = [];

server.on('close', () => {
    console.log('Server closed !');
});

server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port +'.');
});

server.on('connection', socket => {
    console.log('CONNECTED: ' + socket );
    sockets.push(socket);

    console.log('server details');

    const address = server.address();
    const family = address.family;
    const ipAddress = address.address;
    console.log('Server ip :' + ipAddress);
    console.log('Server is IP4/IP6 : ' + family);

    socket.on('data', data => {
        console.log('DATA ' + socket.remoteAddress + ': ' + data);
        sockets.forEach((socket, index, array) => {
            socket.write(socket.remoteAddress + ':' + socket.remotePort + " said " + data);
        });
    });

    socket.on('error', err => {
        console.log(err)
    });

    socket.on('close', () => {
        let index = sockets.findIndex(o => {
            return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort;
        });
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + socket.remoteAddress + ' ' + socket.remotePort);
    });

    socket.on('end', (data) => {
        console.log('Socket ended from other end!');
        console.log('End data : ' + data);
    })
});

server.maxConnections = 10;

setTimeout(function(){
    server.close();
},5000000);
