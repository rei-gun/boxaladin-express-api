var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const paginate = require('express-paginate');
var nodeEnv = process.env.NODE_ENV;
if (nodeEnv === 'development') {
  var envPath = path.resolve('.env.dev');
} else if (nodeEnv === 'test') {
  var envPath = path.resolve('.env.test');
} else if (nodeEnv === 'production') {
  var envPath = path.resolve('.env.prod');
}
// var envPath = nodeEnv === 'development' ? path.resolve('.env.dev') : path.resolve('.env.prod');
console.log('envPath: ',envPath);
require('dotenv').config({path: envPath})
var firebase = require('firebase')
var admin = require("firebase-admin")
var xmlparser = require('express-xml-bodyparser')
const cron = require("node-cron");
const bcaCron = require("./controller/bcaCron")

var auth = require("./helpers/auth")

// Initialize Firebase Admin

// Initialize Firebase
var config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "boxaladin-auction.firebaseapp.com",
  databaseURL: "https://boxaladin-auction.firebaseio.com",
  projectId: "boxaladin-auction",
  storageBucket: "boxaladin-auction.appspot.com",
  messagingSenderId: "912503242137"
};
firebase.initializeApp(config);

// cron.schedule("* * * * * *", bcaCron.updatePaymentBca);

var index = require('./routes/index');
var users = require('./routes/users');
var win = require('./routes/win');
var reward = require('./routes/reward');
var claim = require('./routes/claim');
var admin = require('./routes/admin');
// var bca = require('./routes/bcaRoute')
// var exportPhoneNumber = require('./routes/exportPhoneNumber')

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(xmlparser());
app.use(bodyParser.text());
app.use(paginate.middleware(50, 50));

app.use('/', index);
app.use('/users', users);
app.use('/win', win);
app.use('/reward', reward);
app.use('/claim',  claim);
app.use('/admin',  admin);
// app.use('/bca', bca);
// app.use('/exportPhoneNumber', exportPhoneNumber)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
