const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var users = new Users();
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('join', (params, callback) => {
    console.log(`params name: ${params.name} and room: ${params.room}`);
    if (!isRealString(params.name) || !isRealString(params.room)) {

      return callback('Name and Room name are required');

    } else if (users.getUserList(params.room).includes(params.name)) {

      return callback('User Name has been taken please choose another one');

    } else {

      users.addUser(socket.id, params.name, params.room);
      socket.join(params.room);
      socket.emit('newMessage', generateMessage('admin', 'Welcome to the Chat App'));
      // io.in(params.room).emit('newConnectedUser', theUser);
      io.in(params.room).emit('updateUsersList', users.getUserList(params.room));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined the room`));
      callback();

    }
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.users.find((user) => {
      if (user.name === message.from) {
        return user;
      }
    });
    io.in(user.room).emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if (user) {
        io.in(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    // console.log('The user is about to disconnect');
    var user = users.getUser(socket.id);
    // console.log('THE USERS LIST: ', users.getUserList(user.room));
    // console.log('(On Disconnecting BEFORE calling removeUser) THE USERS LIST is an array?: ', Array.isArray(users.users));
    // console.log(user);
    // console.log('Users List before leaving the room: ', users.getUserList(user.room));
    users.removeUser(user.id);
    // console.log('THE USERS LIST: ', users.users);
    // console.log('(On Disconnecting) THE USERS LIST is an array?: ', Array.isArray(users.users));
    io.in(user.room).emit('updateUsersList', users);
    // console.log('Room of the user leaving: ', user.room);
    console.log('Users List after leaving the room: ', users.getUserList(user.room));
    // console.log('THE USERS LIST: ', users.users);
    socket.broadcast.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left the room`));
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

server.listen(port, () => console.log(`App is listening on port ${port}`));
