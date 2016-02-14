webpackHotUpdate(0,{

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Backbone = __webpack_require__(163);

	var Router = Backbone.Router.extend({
		routes: {
			'': 'login',
			'todos': requiresAuth('todos')
		},
		login: function login() {
			console.log('::');
			if (window.ref.getAuth()) {
				this.navigate('todos', { trigger: true });
			} else {
				app.renderLogin();
			}
		},
		todos: function todos() {
			app.renderTodos();
		}
	});

	function requiresAuth(handlerName) {
		return function () {
			if (window.ref.getAuth()) {
				this[handlerName].apply(this, arguments);
			} else {
				this.navigate('', { trigger: true });
			}
		};
	}

	module.exports = Router;

/***/ }

})