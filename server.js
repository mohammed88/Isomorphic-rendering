var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Backbone = require('backbone');
var React = require('react');
var Firebase = require('firebase');
var ReactDOMServer = require('react-dom/server');
var path = require('path');

var TodoList = require('./components/todo-list');
var Login = require('./components/login');
var TodoCollection = require('./models/todo-collection');
var firebase = new Firebase('https://sweltering-torch-5006.firebaseio.com');

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req,res) {
	if (firebase.getAuth() !== null) {
		res.redirect('/todos');
	} else {
		var component = React.createFactory(Login);
		var reactHtml = ReactDOMServer.renderToString( component() );
		res.render("index.ejs", {reactOutput: reactHtml});
	}
});

app.post('/', function(req,res) {
	login(req.body.email, req.body.pass, req, res); //@todo: use promises
});

app.get('/todos', function(req,res) {
	if (firebase.getAuth() !== null) {
		var component = React.createFactory(TodoList);
		var todos = new TodoCollection();
		todos.on('sync', function(model) {
			var reactHtml = ReactDOMServer.renderToString( component({todos: model}) );
			res.render("index.ejs", {reactOutput: reactHtml});
		});
	} else {
		res.redirect('/');
	}
});

app.get('/logout', function(req, res){
	firebase.unauth();
	res.clearCookie('uid');
	res.redirect('/');
});

var login = function(email, pass, req, res) {
	firebase.authWithPassword({
		email: email,
		password : pass
	}, authHandler);

	function authHandler(error, authData) {
		if (error) {
			res.redirect('/');
		} else {
			res.cookie('uid', authData.uid, {httpOnly: true});
			res.redirect('/todos');
		}
	}
};

app.listen('8080');

//@todo: try to use the client side router + try to use the client side login workflow
//@todo use redis store to save sessions