var cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Middlewares
app.use(cors());
app.use(bodyParser.json({type: 'application/json'}));

// Connect to Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/code-raider');
var db = mongoose.connection;

//Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/codebases', require('./routes/codebases'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/notifications', require('./routes/notifications'));

const port = process.env.port || 8080;
app.listen(port,'127.0.0.1');
console.log('Running on port: ' + port);