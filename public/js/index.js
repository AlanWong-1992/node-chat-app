var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'john',
  //   text: 'This is a new mess age about testing socket.io'
  // });
});

function scrollToBottom () {
  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  // console.log(`clientHeight: ${clientHeight}, scrollTop ${scrollTop}, scrollHeight: ${scrollHeight}, newMessageHeight: ${newMessageHeight}, lastMessageHeight: ${lastMessageHeight}`);
  // console.log(`clientHeight + scrollTop + newMessageHeight +lastMessageHeight is ${clientHeight + scrollTop + scrollHeight + newMessageHeight +lastMessageHeight} : scrollHeight is ${scrollHeight}`);
  if (clientHeight + scrollTop + newMessageHeight +lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('newMessage', function (newMessage) {
  var template = jQuery('#message-template').html();
  var formattedTime = moment(newMessage.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: newMessage.from,
    createdAt: formattedTime,
    text: newMessage.text
  });

  jQuery('#messages').append(html);

  scrollToBottom();
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log(message.url);
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  jQuery('#messages').append(html);

  scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location.....');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
