'use strict';

var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var browserHistory = require('react-router').browserHistory;
var TodoItem = require('./todo-item');

var TodoList = React.createClass({
	displayName: 'TodoList',

	mixins: [Backbone.Events],

	componentDidMount: function componentDidMount() {
		this.listenTo(this.props.route.todos, 'add remove change', function () {
			this.forceUpdate();
		}, this);
		this.props.route.todos.fetch();
	},
	getInitialState: function getInitialState() {
		return { editing: null };
	},
	logout: function logout(e) {
		e.preventDefault();
		document.cookie = "email=undefined";
		document.cookie = "password=undefined";
		browserHistory.push('/logout');
	},
	add: function add(e) {
		e.preventDefault();
		this.props.route.todos.create({ title: this.refs.new.value });
		this.refs.new.value = "";
		this.refs.new.focus();
	},
	remove: function remove(todo) {
		todo.destroy();
	},
	toggle: function toggle(todo) {
		todo.save({ 'completed': !todo.attributes.completed });
	},
	edit: function edit(todo) {
		this.setState({ editing: todo.attributes.title });
	},
	update: function update(todo, text) {
		todo.save({ 'title': text });
	},
	cancel: function cancel(todo) {
		this.setState({ editing: null });
	},
	render: function render() {
		var todos = this.props.route.todos;
		var list = todos.map(function (todo) {
			return React.createElement(TodoItem, {
				key: todo.attributes.id,
				title: todo.attributes.title,
				completed: todo.attributes.completed,
				editing: todo.attributes.title === this.state.editing,
				onRemove: this.remove.bind(this, todo),
				onToggle: this.toggle.bind(this, todo),
				onEdit: this.edit.bind(this, todo),
				onUpdate: this.update.bind(this, todo),
				onCancel: this.cancel.bind(this, todo)
			});
		}, this);
		return React.createElement(
			'div',
			null,
			React.createElement(
				'header',
				{ className: 'header' },
				React.createElement(
					'h1',
					null,
					'todos'
				),
				React.createElement(
					'h4',
					{ className: 'logout' },
					React.createElement(
						'a',
						{ href: 'logout', onClick: this.logout },
						'Logout'
					)
				)
			),
			React.createElement(
				'section',
				null,
				React.createElement(
					'form',
					{ onSubmit: this.add },
					React.createElement('input', { className: 'new-todo', ref: 'new', placeholder: 'What needs to be done?', autofocus: '', type: 'text' })
				)
			),
			React.createElement(
				'section',
				null,
				React.createElement(
					'ul',
					{ className: 'todo-list' },
					list
				)
			)
		);
	}
});

module.exports = TodoList;