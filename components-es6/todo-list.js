var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var browserHistory = require('react-router').browserHistory;
var TodoItem = require('./todo-item');

var TodoList = React.createClass({
	mixins: [Backbone.Events],

	componentDidMount() {
		this.listenTo(this.props.route.todos, 'add remove change', function() {
			this.forceUpdate();
		}, this);
		this.props.route.todos.fetch();
	},

	getInitialState() {
		return {editing: null};
	},

	logout(e) {
		e.preventDefault();
		document.cookie = "email=undefined";
		document.cookie = "password=undefined";
		browserHistory.push('/logout');
	},

	add(e) {
		e.preventDefault();
		this.props.route.todos.create({ title: this.refs.new.value })
		this.refs.new.value = "";
		this.refs.new.focus();
	},

	remove(todo) {
		todo.destroy();
	},

	toggle(todo) {
		todo.save({'completed': !todo.attributes.completed});
	},

	edit(todo) {
		this.setState({editing: todo.attributes.title});
	},

	update(todo, text) {
		todo.save({'title': text});
	},

	cancel(todo) {
		this.setState({editing: null});
	},

	render() {
		var todos = this.props.route.todos;
		var list = todos.map(function(todo) {
			return (
				<TodoItem
					key={todo.attributes.id}
					title={todo.attributes.title}
					completed={todo.attributes.completed}
					editing={todo.attributes.title === this.state.editing}
					onRemove={this.remove.bind(this, todo)}
					onToggle={this.toggle.bind(this, todo)}
					onEdit={this.edit.bind(this, todo)}
					onUpdate={this.update.bind(this, todo)}
					onCancel={this.cancel.bind(this,todo)}
				/>
			);
		}, this);
		return(
			<div>
				<header className="header">
					<h1>todos</h1>
					<h4 className="logout"><a href="logout" onClick={this.logout}>Logout</a></h4>
				</header>
				<section>
					<form onSubmit={this.add}>
						<input className="new-todo" ref="new" placeholder="What needs to be done?" autofocus="" type="text" />
					</form>
				</section>
				<section>
					<ul className="todo-list">{list}</ul>
				</section>
			</div>
		);
	}
});

module.exports = TodoList;