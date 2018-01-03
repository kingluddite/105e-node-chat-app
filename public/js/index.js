const socket = io(); // opens a connection

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', message => {
  console.log('newMessage', message);
  const li = jQuery('<li></li');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', e => {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: jQuery('[name=message]').val(),
    },
    () => {}
  );
});
const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return console('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      console.log('Unable to fetch location.');
    }
  );
});
