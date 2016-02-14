'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var TodoItem = React.createClass({
	displayName: 'TodoItem',
	getInitialState: function getInitialState() {
		return {
			editText: this.props.title
		};
	},
	updateText: function updateText(e) {
		this.setState({ editText: e.target.value });
	},
	handleSubmit: function handleSubmit(e) {
		var title = this.state.editText.trim();
		title ? this.props.onUpdate(title) : this.props.onRemove();
	},
	handleKeyDown: function handleKeyDown(e) {
		if (e.keyCode === 13) {
			this.handleSubmit(e);
		} else if (e.keyCode === 27) {
			this.setState({ editText: this.props.title });
			this.props.onCancel();
		}
	},
	render: function render() {
		var _props = this.props;
		var title = _props.title;
		var completed = _props.completed;
		var editing = _props.editing;

		return React.createElement(
			'li',
			{ className: classNames({ completed: completed, editing: editing }) },
			React.createElement(
				'div',
				{ className: 'view' },
				React.createElement('input', { className: 'toggle', type: 'checkbox', checked: completed ? "checked" : "", onChange: this.props.onToggle }),
				React.createElement(
					'label',
					{ onDoubleClick: this.props.onEdit },
					title
				),
				React.createElement('button', { className: 'destroy', onClick: this.props.onRemove })
			),
			React.createElement('input', { className: 'edit',
				value: this.state.editText,
				onChange: this.updateText,
				onBlur: this.handleSubmit,
				onKeyDown: this.handleKeyDown })
		);
	}
});

module.exports = TodoItem;