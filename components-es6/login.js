var React = require('react');
var ReactDOM = require('react-dom');

var Login = React.createClass({
	login(e) {
		e.preventDefault();
		window.ref.authWithPassword({
			email: this.refs.email.value,
			password : this.refs.pass.value
		}, authHandler);

		function authHandler(error, authData) {
			if (error) {
				console.log('Login Failed!', error);
			} else {
				console.log('Authenticated successfully with payload:', authData);
				window.app.router.navigate('todos', {trigger: true});
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
					<input type="password" name="pass" ref="pass" placeholder="Password" />
					<input type="submit" id="login-button" value="Login" />
				</form>
			</div>
		);
	}
})

module.exports = Login;