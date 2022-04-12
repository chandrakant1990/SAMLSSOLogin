var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config=require("./config/config");
const passportConfig=require("./config/passport");
const session=require("express-session");
var cors = require('cors')
const passport=require("passport");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session(config.config.session));
app.use(passport.initialize());
app.use(passport.session());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3001");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.get("/login",passport.authenticate('saml',config.config.saml.options),(req,res,next)=>{
  res.redirect("http://localhost:3001");
})

app.post("/login/callback",passport.authenticate('saml',config.config.saml.options),(req,res,next)=>{
  res.redirect("http://localhost:3001");
});

app.post("/getMyData",(req,res,next)=>{
  debugger;
  res.send({
    status:true,
    message:"success"
  })
});

app.get("/whoami",(req,res,next)=>{
  if(!req.isAuthenticated()){
    console.log("User unauthorized");
    res.status(401).json({message:"unauthorized"});

  }else{
    console.log("User is authenticated");
    res.status(200).json({
      user:req.user
    })
  }
});


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
