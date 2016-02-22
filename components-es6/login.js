var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

var Login = React.createClass({
	login(e) {
		e.preventDefault();

		var email = this.refs.email.value;
		var password = this.refs.password.value;

		window.ref.authWithPassword({
			email: email,
			password : password
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

	render() {
		return (
			<div>
				<header>
					<h1>login</h1>
				</header>
				<form className="login" onSubmit={this.login} action="/" method="post">
					<input type="text" name="email" ref="email" autofocus="" placeholder="Email" autoComplete />
					<input type="password" name="password" ref="password" placeholder="Password" />
					<input type="submit" id="login-button" value="Login" />
				</form>
			</div>
		);
	}
})

module.exports = Login;