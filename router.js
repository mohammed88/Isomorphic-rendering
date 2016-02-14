var Backbone = require('backbone');

var Router = Backbone.Router.extend({
	routes: {
		'' : 'login',
		'todos' : requiresAuth('todos')
	},
	login: function () {
		if (window.ref.getAuth()) {
			this.navigate('todos', {trigger: true});
		} else {
			app.renderLogin();
		}
	},
	todos: function () {
		app.renderTodos();
	}
});

function requiresAuth (handlerName) {
	return function () {
		if (window.ref.getAuth()) {
			this[handlerName].apply(this, arguments)
		} else {
			this.navigate('', {trigger: true});
		}
	}
}

module.exports = Router;