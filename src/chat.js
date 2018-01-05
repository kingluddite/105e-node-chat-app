import io from 'socket.io-client';
import jQuery from 'jquery';
import moment from 'moment';
import Mustache from 'mustache';
// import validator from 'validator';

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const socket = io(); // opens a connection

const scrollToBottom = () => {
  // Selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');

  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', message => {
  if (
    document.getElementById('message-template') &&
    document.getElementById('messages')
  ) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template');
    console.log(typeof template);
    const templateHtml = template.html();
    const html = Mustache.render(templateHtml, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime,
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  }
});

socket.on('newLocationMessage', message => {
  if (
    document.getElementById('message-template') &&
    document.getElementById('messages')
  ) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template');

    const templateHtml = template.html();
    const html = Mustache.render(templateHtml, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime,
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  }
});

jQuery('#message-form').on('submit', e => {
  e.preventDefault();

  const messageInput = jQuery('[name=message]');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageInput.val(),
    },
    () => {
      messageInput.val('');
    }
  );
});
const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return console('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttr('disabled').text('Sending location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    () => {
      locationButton.revoveAttr('disabled').text('Send location');
      console.log('Unable to fetch location.');
    }
  );
});
