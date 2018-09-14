const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
console.log(`The public path is ${publicPath}`);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log('App is listening on port ${port}'));
//app.listen
//start up server and start up in terminal and go to the localhost.
