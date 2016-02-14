require('./css/styles.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var TodoCollection = require('./models/todo-collection');
var Router = require('./router');
var TodoList = require('./components/todo-list');
var Login = require('./components/login');

var App = Backbone.View.extend({
	el: $('.todoapp'),

	initialize: function() {
		this.router = new Router();
		this.todos = new TodoCollection();
	},
	
	renderTodos: function() {
		ReactDOM.render(<TodoList todos={this.todos} />, this.el);
	},

	renderLogin: function(){
		ReactDOM.render(<Login />, this.el);
	}
});

window.ref = new Firebase('https://sweltering-torch-5006.firebaseio.com');
window.app = new App();
Backbone.history.start({pushState: true});

