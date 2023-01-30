import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();
const PORT = 4000;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});
app.get('/', (req, res) => {
  res.json({ message: 'Hello world' });
});
io.on('connection', (socket) => {
  socket.on('send-message', (data) => {
    socket.broadcast.emit('message-from-server', data);
  });
  socket.on('disconnect', (socket) => {
    console.log('User left.');
  });
});
httpServer.listen(PORT, () => {
  console.log('Server is running at http://localhost:4000');
});
