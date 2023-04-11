import WebSocket from 'ws';

var socket;

function openSocket() {
    socket = new WebSocket('ws://localhost:3000');

    socket.on('open', () => {
        console.log('Connected to server');
        socket.send('Hello from client');
    });
    
    socket.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
    
    socket.on('close', () => {
        console.log('Disconnected from server');
    });
    
    socket.on('error', (error) => {
        console.log(`Error => ${error}`);
    });
}

// retry connection every 5 seconds
setInterval(() => {
    if (!socket || socket.readyState === WebSocket.CLOSED) openSocket();
}, 5000);