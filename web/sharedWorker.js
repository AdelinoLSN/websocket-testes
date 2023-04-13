importScripts('https://cdn.socket.io/4.6.0/socket.io.min.js');

var socket = io.connect('http://localhost:3000');
var browserInstances = [];

socket.on('connect', () => {
    postMessage('connected', browserInstances);

    socket.emit('join', '2121');
});

socket.on('disconnect', () => {
    postMessage('disconnected');
});

socket.on('message', function(data) {
    postMessage(data, browserInstances);
});

onconnect = function(e) {
    const port = e.ports[0];

    browserInstances.push(port);

    if (browserInstances.length > 1) {
        postMessage('reconnected', [port]);
    }

    port.onmessage = function(e) {
        socket.emit('message', e.data);
        postMessage(e.data, browserInstances);
    }
};

function postMessage(data, browserInstances) {
    browserInstances.map((browserInstance) => {
        browserInstance.postMessage(data);
    });
}