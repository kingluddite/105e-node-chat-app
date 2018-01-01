const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Mr. Darth V',
    text: 'Luke. I am your father.',
    createdAt: new Date().getTime(),
  });

  socket.on('createMessage', message => {
    console.log('createMessage', message);
  });
});

server.listen(port, () => {
  console.log(`App started on port ${port}. VROOOOOOM!`);
});