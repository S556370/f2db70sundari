var createError = require('http-errors');
var express = require('express');
var path = require('path');

var mongoose = require('mongoose')
var mongodb = require('mongodb')

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var universities = require("./models/university");


require('dotenv').config();
const connectionString =  process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var universityRouter = require('./routes/university');
var gridBuildRouter = require('./routes/gridbuild');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/university', universityRouter);
app.use('/gridbuild', gridBuildRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




async function recreateDB() {
  // Delete everything	
  await universities.deleteMany();
  let instance1 = new
    universities({ "University_Id":1,"University_Name": "Northwest Missouri State University", "Capacity": 12000, "Location": "Maryville", "State": "Missouri", "Country": "USA" });
  let instance2 = new
    universities({ "University_Id":2,"University_Name": "California State University", "Capacity": 480000, "Location": " Los Angeles", "State": "California", "Country": "USA" });
  let instance3 = new
    universities({ "University_Id":3,"University_Name": "Alabama State University", "Capacity": 75000, "Location": "Montgomery", "State": "Alabama", "Country": "USA" });

  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First Object saved")
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Secound Object saved")
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Third Object saved")
  });
}
let reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;
