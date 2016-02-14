var Backbone = require('backbone');
var Firebase = require('firebase');
var _ = require('lodash');
var TodoModel = require('./todo');

// backbonefire depends on globals - Backbone and _. CommonJS flavor is not available.
// use script-loader for creating client side bundle with webpack
global.Backbone = Backbone; global._ =  _;
if(typeof window === "undefined" ) {
	window = global;
	require('../bower_components/backbonefire/dist/backbonefire');
} else {
	require('script!../bower_components/backbonefire/dist/backbonefire');
}

var TodoCollection = Backbone.Firebase.Collection.extend({
	model: TodoModel,
	url: 'https://sweltering-torch-5006.firebaseio.com/'
});

module.exports = TodoCollection;;