var TodoCollection = require('./models/todo-collection');
var TodoList = require('./components/todo-list');
var Login = require('./components/login');

var routes = [
	{
		path: '/',
		component: Login,
		onEnter: function(nextState, replace) {
			if (ref.getAuth() !== null) {
				replace('/todos');
			}
		}
	},
	{
		path: '/todos',
		component: TodoList,
		onEnter: function(nextState, replace, cb) {
			if (ref.getAuth() === null) {
				replace('/');
				cb();
			} else { // @fetch data
				var todos = new TodoCollection();
				var self = this;
				todos.on('sync', function(model) {
					self.todos = model;
					cb();
				});
			}
		}
	},
	{
		path: '/logout',
		component: Login,
		onEnter: function(nextState, replace) {
			ref.unauth();
			replace('/');
		}
	}
];

module.exports = routes;

//@todo: figure out how to pass data a props. Ex: todos ('this.props.todos' instead of 'this.props.route.todos')