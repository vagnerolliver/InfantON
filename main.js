var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var passport = require('passport');
var passportLocal = require('passport-local');
var passportHttp = require('passport-http');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ 
 			secret: process.env.SESSION_SECRET || 'secret'
		,	resave:false
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
	res.render('login');
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

var port = process.env.PORT || 1337;

app.listen(port, function(){
	console.log('http://127.0.0.1:'+ port + '/')
});

module.exports = app;