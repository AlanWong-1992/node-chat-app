var socket = io();
socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: 'someOneNew',
    subject: 'Create New Message',
    body: 'This is a new message about testing socket.io'
  });
});

socket.on('newMessage', function (newMessage) {
  console.log('New Message', newMessage);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});