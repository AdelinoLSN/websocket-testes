// Create a websocket server instance using npm package ws

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

var clients = new Set();

// Listen for new connections

wss.on('connection', (ws) => {
    // Send a message to the connected client
    ws.send('Hello from server');

    // Listen for messages from the connected client
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });
}
);

// Each 5 seconds if a random number is odd, send a message to the connected client

setInterval(() => {
    wss.clients.forEach((client) => {
        const random = Math.random();
        if (random > 0.5) {
            client.send('Hello from server '+random);
        }
    });
}, 5000);