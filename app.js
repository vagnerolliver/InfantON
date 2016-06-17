'use strict';

require('./config/dbModels');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportHttp = require('passport-http');

// var routes = require('./routes/index');
// var users = require('./routes/users');
var authenticate = require('./routes/authenticate')(passport);


// Nossos módulos da API
const UsersAPI = require('./modules/User/routes');
const AlunosAPI = require('./modules/Aluno/routes');
const CursosAPI = require('./modules/Curso/routes');
const ProfessoressAPI = require('./modules/Professor/routes');

 
var authenticate = require('./routes/authenticate')(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ 
      secret: process.env.SESSION_SECRET || 'secret'
    , resave:false
    , saveUninitialized:false 
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use( new passportLocal.Strategy( verifyCredentials ));

passport.use( new passportHttp.BasicStrategy( verifyCredentials ));

function verifyCredentials( username, password, done ){ 
  // Preten this is usign a a real database 
  if( username == password ){
    console.log(username)
    done(null, { id: username , name: username });
  } else {
    done(null,null);
  }
}

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    // query database or cache here!
      done(null, {id: id, name: id});
});


function ensureAuthenticated(req, res, next){
  if( req.isAuthenticated() ){
    next();
  } else {
    res.send(403)
  }
}

app.get('/', function(req, res){
  res.render('index', {
     isAuthenticated: req.isAuthenticated()
    ,user:req.user
  });
});

app.get('/login',function(req, res){
  res.render('login', {
     isAuthenticated: req.isAuthenticated()
    ,user:req.user
  });
});

app.post('/login',passport.authenticate('local'), function( req, res){
   res.redirect('/');
});

app.get('/logout',function(req, res){
  req.logout();
  res.redirect('/');
});


app.use('/api', passport.authenticate('basic'));

app.get('/api/data', ensureAuthenticated, function(req, res){
   res.json([
    { value: 'foo'},
    { value: 'bar'},
    { value: 'baz'},
   ])
});
// API JSON
app.use('/api/users', UsersAPI);
app.use('/api/alunos', AlunosAPI);
app.use('/api/cursos', CursosAPI);
app.use('/api/professores', ProfessoressAPI);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
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