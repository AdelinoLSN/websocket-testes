var socket = io('ws://localhost:3000');
var ports = [];

addEventListener('connect', (event) => {
    console.log('sharedWorker: addEventListener');

    var port = event.ports[0];
    ports.push(port);
    port.start();

    port.addEventListener('message', () => {
        socket.on(event.data.events[0], (e) => {
            port.postMessage(e);
        });
    });
});

socket.on('connect', () => {
    console.log('sharedWorker: connect');

    ports.forEach((port) => {
        port.postMessage({ type: 'connect', data: socket.id });
    });
});

socket.on('disconnect', () => {
    console.log('sharedWorker: disconnect');
    
    ports.forEach((port) => {
        port.postMessage({ type: 'disconnect' });
    });
});



// "use strict";

// importScripts('http://cdn.socket.io/socket.io-1.1.0.js');

// var socket = io(self.name),
//     ports = [];

// addEventListener('connect', function (event) {
//     var port = event.ports[0];
//     ports.push(port);
//     port.start();

//     port.addEventListener("message", function (event) {
//         for (var i = 0; i < event.data.events.length; ++i) {
//             var eventName = event.data.events[i];

//             socket.on(event.data.events[i], function (e) {
//                 port.postMessage({type: eventName, message: e});
//             });
//         }
//     });
// });

// socket.on('connect', function () {
//     for (var i = 0; i < ports.length; i++) {
//         ports[i].postMessage({type: '_connect'});
//     }
// });

// socket.on('disconnect', function () {
//     for (var i = 0; i < ports.length; i++) {
//         ports[i].postMessage({type: '_disconnect'});
//     }
// });



// var socket;

//     function connect() {
//         socket = io.connect('http://localhost:3000');

//         socket.on('connect', function() {
//             console.log('Connected');

//             socket.emit('join', '2121');
//         });

//         socket.on('disconnect', function() {
//             console.log('Disconnected');
//         });

//         socket.on('message', function(data) {
//             console.log(data);
//         });
//     }

//     setTimeout(() => connect(), 5000);