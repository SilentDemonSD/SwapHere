const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

connectDB()

const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', socket.id);
  });

  socket.on('signal', (data) => {
    io.to(data.to).emit('signal', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/Auth'));
app.use('/api/skills', require('./routes/skill'));
app.use('/api/users', require('./routes/user'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
