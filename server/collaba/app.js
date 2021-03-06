var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var app = express();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/login');
// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var auth = require("./auth.js")();
var jwt = require('jwt-simple');
var users = require('./models/user');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(express.session({ secret: 'keyboard cat' }));
//   app.use(passport.initialize());
//   app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../../client')));
app.use(express.static(path.join(__dirname, '../../client/app')));
app.use(function(req,res,next){
    req.db = db;
    next();
});
app.use('/', routes);
//app.use('/',login);
app.use('/users', users);


// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost/users');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("you are connectes to mongoose");
});
// catch 404 and forward to error handler


app.get('/',function(req,res){
  res.json({status: "api is alive"});
});
app.get('/check',auth.authenticate(),function(req,res){
res.send("success");
console.log(req.user.email+"  yellow");
});
app.post('/token',function(req,res){
  var userN=req.body.username;
  var pass=req.body.password;
  console.log(userN+" "+pass);
  users.findOne({username: userN,password: pass},function(err,user){
    if ((err)) {
      console.log("fail");
      res.sendStatus(401);
    }
    else if(user==null)
    {
      console.log("fail2");
      res.sendStatus(401);
    }
    else{
      console.log("emil is:"+user.email);
      var payload = {email:user.email,name:user.username};
      var token = jwt.encode(payload,'secret');
      res.json({token:token});
    }
  });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');

  err.status = 404;
  console.error(err.stack);
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
