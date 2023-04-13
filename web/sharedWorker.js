importScripts('https://cdn.socket.io/4.6.0/socket.io.min.js');

var socket = io.connect('http://localhost:3000');
var browserInstances = [];

socket.on('connect', () => {
    postMessage('connected');

    socket.emit('join', '2121');
});

socket.on('disconnect', () => {
    postMessage('disconnected');
});

socket.on('message', function(data) {
    postMessage(data);
});

onconnect = function(e) {
    const port = e.ports[0];

    browserInstances.push(port);

    port.onmessage = function(e) {
        socket.emit('message', e.data);
    }
};

function postMessage(data) {
    browserInstances.map((browserInstance) => {
        browserInstance.postMessage(data);
    });
}