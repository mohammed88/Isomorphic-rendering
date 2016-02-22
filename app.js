require('./css/styles.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var match = ReactRouter.match;
var history = ReactRouter.browserHistory;
var routes = require('./routes');

window.ref = new Firebase('https://sweltering-torch-5006.firebaseio.com');

$(function(){
	match({ history, routes, location }, (error, redirectLocation, renderProps) => {
		if(redirectLocation) {
			console.log('Server did not load correct landing page due to redirection failure on the server side.')
		}
		else if(renderProps) {
			ReactDOM.render(<Router {...renderProps} />, $('.todoapp')[0]);
		}
	});
});

