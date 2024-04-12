var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var upload = multer();

var cors = require("cors");
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

app.use(cors());
//app.options("*",cors());

//Require the Router we defined in movies.js
var movies = require('./movies.js');
var users = require('./users.js');
var products = require('./products.js');
var carts = require('./carts.js');
var room = require('./room.js');
var amenties = require('./amenties.js');
var photos = require('./photos.js');
var booking = require('./booking.js');

//Use the Router on the sub route /movies
app.use('/movies', movies);
app.use('/users', users);
app.use('/products', products);
app.use('/carts', carts);
app.use('/room', room);
app.use('/amenties', amenties);
app.use('/photos', photos);
app.use('/booking', booking);

//app.use(cors());

// var corsOptions = {
//     origin: 'http://localhost:3001/',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

app.listen(3001);