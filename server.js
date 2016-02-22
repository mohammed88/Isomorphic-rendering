var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Backbone = require('backbone');
var React = require('react');
var Firebase = require('firebase');
var ReactDOMServer = require('react-dom/server');
var path = require('path');
var Promise = require('promise');

var ReactRouter = require('react-router');
var match = ReactRouter.match;
var RouterContext = ReactRouter.RouterContext;

global.ref = new Firebase('https://sweltering-torch-5006.firebaseio.com'); //global
var routes = require('./routes');

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('*', function(req, res) {
	var email = req.cookies.email;
	var password = req.cookies.password;

	if (email !== 'undefined' && ref.getAuth() === null) { // client session logged in
		login(email, password).then(function(success) {
			res.cookie('email', email, {});
			res.cookie('password', password, {});
			res.redirect('/');
		}, function(err) {
			res.cookie('email', 'undefined', {});
			res.cookie('password', 'undefined', {});
			res.redirect('/todos');
		});
	}
	else if (email === 'undefined' && ref.getAuth() !== null) { // server session logged in
		ref.unauth();
		res.redirect(req.url);
	}
	else {
		match({routes: routes, location: req.url}, function(err, redirect, props) {
			if(err) {
				console.log('error');
			}
			else if(redirect) {
				res.redirect(redirect.pathname + redirect.search);
			}
			else if(props) {
				res.render("index.ejs", {reactOutput: ReactDOMServer.renderToString(React.createElement(RouterContext, props))});
			}
			else {
				res.status(404).send('Not Found');
			}
		});
	}
});

app.post('/', function(req,res) {
	var email = req.body.email;
	var password = req.body.password;

	login(email, password).then(function(success) {
			res.cookie('email', email, {});
			res.cookie('password', password, {});
			res.redirect('/');
		}, function(err) {
			res.cookie('email', 'undefined', {});
			res.cookie('password', 'undefined', {});
			res.redirect('/todos');
	});
});

function login(email, password) {
	return new Promise(function(resolve, reject){
		ref.authWithPassword({email: email, password : password}, function handler(error, authData) {
			if(error) {
				reject(error);
			} else {
				resolve(authData);
			}
		});
	});
}

app.listen('8080');