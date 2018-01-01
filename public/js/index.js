const socket = io(); // opens a connection

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createMessage', {
    from: 'Sir Luke S',
    text: 'Prove it. Bring your lightsaber',
  });
});

socket.on('newMessage', message => {
  console.log('newMessage', message);
});
