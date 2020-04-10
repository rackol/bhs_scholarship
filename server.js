var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

require('./routes/routes.js')(app)
mongoose.connect('mongodb+srv://Pierce:123@cluster0-5su8y.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true })
app.listen(3000);