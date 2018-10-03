const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('admin', 'Welcome to the Chat App'))
  // from: 'admin',
  // text: 'Welcome to the Chat App',
  // createdAt: new Date().getTime()
  socket.broadcast.emit('newMessage',
    generateMessage('admin', 'A New User has joined the room')
      // from: 'admin',
      // text: 'new user has joined the room',
      // createdAt: new Date().getTime()
  )

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

server.listen(port, () => console.log(`App is listening on port ${port}`));
