'use strict';

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _jqueryDeparam = require('jquery-deparam');

var _jqueryDeparam2 = _interopRequireDefault(_jqueryDeparam);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

require('normalize.css/normalize.css');

require('./styles/styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./../server/utils/validation'),
    getPathFromUrl = _require.getPathFromUrl;
// import validator from 'validator';


// console.log(jQuery.param({ name: 'Joe', age: 22 }));

var socket = (0, _socket2.default)(); // opens a connection

var scrollToBottom = function scrollToBottom() {
  // Selectors
  var messages = (0, _jquery2.default)('#messages');
  var newMessage = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function () {
  var noDollar = getPathFromUrl(window.location.search);
  var params = _jquery2.default.deparam(noDollar);
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  console.log('Users list', user);
});

socket.on('newMessage', function (message) {
  if (document.getElementById('message-template') && document.getElementById('messages')) {
    var formattedTime = (0, _moment2.default)(message.createdAt).format('h:mm a');
    var template = (0, _jquery2.default)('#message-template');
    var templateHtml = template.html();
    var html = _mustache2.default.render(templateHtml, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

    (0, _jquery2.default)('#messages').append(html);
    scrollToBottom();
  }
});

socket.on('newLocationMessage', function (message) {
  if (document.getElementById('message-template') && document.getElementById('messages')) {
    var formattedTime = (0, _moment2.default)(message.createdAt).format('h:mm a');
    var template = (0, _jquery2.default)('#location-message-template');

    var templateHtml = template.html();
    var html = _mustache2.default.render(templateHtml, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });

    (0, _jquery2.default)('#messages').append(html);
    scrollToBottom();
  }
});

(0, _jquery2.default)('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageInput = (0, _jquery2.default)('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageInput.val()
  }, function () {
    messageInput.val('');
  });
});
var locationButton = (0, _jquery2.default)('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return console('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Sending location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.revoveAttr('disabled').text('Send location');
    console.log('Unable to fetch location.');
  });
});
