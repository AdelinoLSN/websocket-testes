import { Server } from 'socket.io';

const PORT = 3000;

const io = new Server(PORT, {
  cors: { origin: '*' },
});

io.on('connection', (client) => {
  console.log(`[connection] Client ${client.id} connected`);

  client.on('disconnect', () => {
    console.log(`[disconnect] Client ${client.id} disconnected`);
  });

  client.on('join', (room) => {
    console.log(`[join] Client ${client.id} joined room ${room}`);
    client.join(room);
  });

  client.on('message', (message) => {
    console.log(`[message] Client ${client.id} sent message: ${message}`);
  });
});

// Each 30 seconds, emit a message to the room 2121
setInterval(() => {
  io.to('2121').emit('message', 'Hello world (2121)');
}, 10000);