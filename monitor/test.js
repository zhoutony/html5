var axon = require('axon');
var sock = axon.socket('push');

sock.connect('tcp://localhost:3091');
sock.hwm = 5000;

sock.send({a:1111});

//https://www.npmjs.com/package/axon