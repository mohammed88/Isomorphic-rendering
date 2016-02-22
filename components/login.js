'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Login = React.createClass({
	displayName: 'Login',
	login: function login(e) {
		e.preventDefault();

		var email = this.refs.email.value;
		var password = this.refs.password.value;

		window.ref.authWithPassword({
			email: email,
			password: password
		}, authHandler);

		function authHandler(error, authData) {
			if (error) {
				console.log('Login Failed!', error);
			} else {
				console.log('Authenticated successfully', authData);
				document.cookie = "email=" + email;
				document.cookie = "password=" + password;
				browserHistory.push('/todos');
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
				React.createElement('input', { type: 'password', name: 'password', ref: 'password', placeholder: 'Password' }),
				React.createElement('input', { type: 'submit', id: 'login-button', value: 'Login' })
			)
		);
	}
});

module.exports = Login;