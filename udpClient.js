const udp = require('dgram');

const client = udp.createSocket('udp4');
const data = Buffer.from('SavageDev');

client.on('message', (msg, info) => {
    console.log('Data received from server : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port)
});

client.send(data, 2222, 'localhost', error => {
    if (error) {
        console.log(error);
        client.close()
    } else {
        console.log('Data sent !!!')
    }
});

const data1 = Buffer.from('hello');
const data2 = Buffer.from('world');

//sending multiple msg
client.send([ data1, data2 ], 2222, 'localhost', error => {
    if (error) {
        console.log(error);
        client.close()
    } else {
        console.log('Data sent !!!')
    }
});

setTimeout( () => {
    client.close()
}, 10000);
