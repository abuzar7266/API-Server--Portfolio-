var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var usersRouter = require('./routes/users');
var projectRouter = require('./routes/projectRouter');
var messageRouter = require('./routes/MessageRouter');
var uploadRouter = require('./routes/uploadRouter');

const mongoose = require('mongoose');



var config = require('./config');

var passport = require('passport');


const server = http.createServer(app);
var hostname = "localhost";
var port = "3001";
server.listen(process.env.port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));

app.use(cors());
app.use('/users', usersRouter);
app.use('/project', projectRouter);
app.use('/message', messageRouter);
app.use('/imageUpload', uploadRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
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