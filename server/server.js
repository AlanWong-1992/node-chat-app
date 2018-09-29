const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', {
  //   from: 'alan',
  //   text: 'Emit new message',
  //   createdAt: '123'
  // });

  // socket.emit only to the user which has joined a welcome Message
  // socket.broadcast.emit telling all other users that the new user has joined the chat room

  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the Chat App',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newMessage', {
      from: 'admin',
      text: 'new user has joined the room',
      createdAt: new Date().getTime()
  })

  socket.on('createMessage', (createMessage) => {
    console.log('create Message', createMessage);
    // io.emit('newMessage', {
    //   from: createMessage.from,
    //   text: createMessage.text,
    //   createdAt: new Date().getTime()
    // });

    // socket.broadcast.emit('newMessage', {
    //   from: createMessage.from,
    //   text: createMessage.text,
    //   createAdt: new Date().getTime()
    // })

  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => res.send('Hello World!'));

server.listen(port, () => console.log(`App is listening on port ${port}`));
//app.listen
//start up server and start up in terminal and go to the localhost.
