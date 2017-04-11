'use strict'

var express = require('express');
var	app = express();
var routes = require('./routes/routes');
var posts = require('./routes/posts');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');
var morgan = require('morgan');
var socket = require('socket.io');
var events = require('./socket.js');
var path = require('path');
var config = require('./config/default.json');
var csrf = require('csurf');

// Init connection to DB
mongoose.connect(config.DB_HOST);

// app.use(session({
//   secret: 'My super session secret',
//   cookie: {
//     httpOnly: true,
//     secure: true
//   }
// }));

// app.use(csrf());
// app.use(helmet())


//app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));


app.use(bodyParser.json())
app.use('/api',routes);
app.use('/api/posts',posts);

// All requests except API requests show the index.html flie of the SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var server = http.createServer(app)

var io = socket(server)
io.on('connection', events);

server.listen(3000,() => {
	console.log('Listening: ' + 3000);
});

module.exports = app;