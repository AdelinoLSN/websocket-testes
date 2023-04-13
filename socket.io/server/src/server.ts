import { Server } from 'socket.io';

const PORT = 3000;

const io = new Server(PORT, {
  cors: { origin: '*' },
});

io.on('connection', (client) => {
  console.log(`Client ${client.id} connected`);

  client.on('disconnect', () => {
    console.log(`[disconnect] Client ${client.id} disconnected`);
  });

  client.on('join', (room) => {
    console.log(`[join] Client ${client.id} joined room ${room}`);
    client.join(room);
  });
});

// Each 30 seconds, emit a message to the room 2121
setInterval(() => {
  io.to('2121').emit('message', 'Hello world (2121)');
}, 30000);

// Each 30 seconds, emit a message to every client
setInterval(() => {
  io.emit('message', 'Hello world');
}, 5000);