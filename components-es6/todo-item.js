var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var TodoItem = React.createClass({
	getInitialState() {
		return {
			editText: this.props.title
		};
	},

	updateText(e) {
		this.setState({editText: e.target.value})
	},

	handleSubmit(e) {
		var title = this.state.editText.trim();
		title ? this.props.onUpdate(title) : this.props.onRemove();
	},

	handleKeyDown(e) {
		if (e.keyCode === 13) {
			this.handleSubmit(e);
		}
		else if (e.keyCode === 27) {
			this.setState({editText: this.props.title});
			this.props.onCancel();
		}
	},

	render() {
		var { title, completed, editing } = this.props;
		return (
			<li className={classNames({completed: completed, editing: editing})}>
				<div className="view">
					<input className="toggle" type="checkbox" checked={completed ? "checked" : ""} onChange={this.props.onToggle} />
					<label onDoubleClick={this.props.onEdit}>{title}</label>
					<button className="destroy" onClick={this.props.onRemove}></button>
				</div>
				<input className="edit"
					value={this.state.editText}
					onChange={this.updateText}
					onBlur={this.handleSubmit}
					onKeyDown={this.handleKeyDown} />
			</li>
		);
	}
})

module.exports = TodoItem;