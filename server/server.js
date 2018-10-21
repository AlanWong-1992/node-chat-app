const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var userList = new Users();
var userCount = 1;
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  var userId;
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and Room name are required');
    }

    if (userList.getUserList(params.room).includes(params.name)) {
      callback('User Name has been taken please choose another one');
    }

    userList.addUser(userCount, params.name, params.room);
    userId = parseInt(userCount);
    userCount += 1;
    socket.join(params.room);
    socket.emit('newMessage', generateMessage('admin', 'Welcome to the Chat App'));
    var theUser = userList.getUser(userId);
    theUser.isOnline = true; // Add this property to see if we should add or remove the user
    io.in(params.room).emit('usersInRoom', theUser);
    // socket.emit('usersInRoom', userList.getUserList(params.room));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin', `${params.name} has joined the room`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = userList.users.find((user) => {
      if (user.name === message.from) {
        return user;
      }
    });
    io.in(user.room).emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = userList.getUser(userId);
    user.isOnline = false;
    io.in(user.room).emit('usersInRoom', user);
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

server.listen(port, () => console.log(`App is listening on port ${port}`));
