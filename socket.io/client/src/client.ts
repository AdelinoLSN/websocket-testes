// A client to connect to a websocket using socket.io

import { io } from 'socket.io-client';

// Retry connection every 15 seconds
const RETRY_INTERVAL = 15000;

// The URL of the websocket server
const SERVER_URL = 'http://localhost:3000';

// The name of the room to join
// GET RANDOM ROOM 2121 OR 2122
const ROOM = Math.floor(Math.random() * 2) + 2121;

// The name of the event to listen for
const EVENT = 'message';

// Connect to the websocket server
const socket = io(SERVER_URL, {
    reconnectionDelayMax: RETRY_INTERVAL,
});

// Listen for the connect event
socket.on('connect', () => {
    console.log(`Connected to ${SERVER_URL}`);

    socket.emit('join', ROOM.toString());
});

// Listen for the disconnect event
socket.on('disconnect', () => {
    console.log(`[disconnect] Disconnected from ${SERVER_URL}`);
});

// Listen for the event
socket.on(EVENT, (data) => {
    console.log(`[EVENT] Received event ${EVENT} with data: ${data}`);
});

// Listen for the error event
socket.on('error', (error) => {
    console.error("error"+ error.message + " " + Date.now());
});

// Listen for the reconnect event
socket.on('reconnect', (attemptNumber) => {
    console.log(`Reconnected to ${SERVER_URL} after ${attemptNumber} attempts`);
});

// Listen for the reconnect_attempt event
socket.on('reconnect_attempt', () => {
    console.log(`Attempting to reconnect to ${SERVER_URL}`);
});

// Listen for the reconnect_failed event
socket.on('reconnect_failed', () => {
    console.log(`Failed to reconnect to ${SERVER_URL}`);
});

// Listen for the reconnect_error event
socket.on('reconnect_error', (error) => {
    console.error("reconnect_error" + error.message + " " + Date.now());
});

// Listen for the connect_error event
socket.on('connect_error', (error) => {
    console.error("[connect_error] " + error.message + " " + Date.now());
});
