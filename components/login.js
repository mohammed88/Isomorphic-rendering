'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Login = React.createClass({
	displayName: 'Login',
	login: function login(e) {
		e.preventDefault();
		window.ref.authWithPassword({
			email: this.refs.email.value,
			password: this.refs.pass.value
		}, authHandler);

		function authHandler(error, authData) {
			if (error) {
				console.log('Login Failed!', error);
			} else {
				console.log('Authenticated successfully with payload:', authData);
				window.app.router.navigate('todos', { trigger: true });
			}
		}
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'header',
				null,
				React.createElement(
					'h1',
					null,
					'login'
				)
			),
			React.createElement(
				'form',
				{ className: 'login', onSubmit: this.login, action: '/', method: 'post' },
				React.createElement('input', { type: 'text', name: 'email', ref: 'email', autofocus: '', placeholder: 'Email', autoComplete: true }),
				React.createElement('input', { type: 'password', name: 'pass', ref: 'pass', placeholder: 'Password' }),
				React.createElement('input', { type: 'submit', id: 'login-button', value: 'Login' })
			)
		);
	}
});

module.exports = Login;