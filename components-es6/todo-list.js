var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var TodoItem = require('./todo-item');

var TodoList = React.createClass({
	mixins: [Backbone.Events],

	componentDidMount() {
		this.listenTo(this.props.todos, 'add remove change', function() {
			this.forceUpdate();
		}, this);
		this.props.todos.fetch();
	},

	getInitialState() {
		return {editing: null};
	},

	logout(e) {
		e.preventDefault();
		window.ref.unauth();
		window.app.router.navigate('', {trigger: true});
	},

	add(e) {
		e.preventDefault();
		this.props.todos.create({ title: this.refs.new.value })
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
		var todos = this.props.todos;
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