var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'john',
  //   text: 'This is a new message about testing socket.io'
  // });
});

socket.on('newMessage', function (newMessage) {
  console.log('New Message', newMessage);
  var li = jQuery('<li></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: '',
//   text: ''
// }, function () {
//   console.log('Got it');
// });

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
