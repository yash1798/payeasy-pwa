import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import "../../styles/login.css"
import user from "../../assets/user.svg"
import padlock from "../../assets/padlock.svg"
import fetchCall from "../../utils/fetchCall"

import { login } from "../../redux/actions/userAction"

export class LoginPage extends Component {
	state = {
		password: "",
		email: "",
		errors: "",
		redirect: false,
	}

	handleChange = (input, e) => {
		this.setState({ [input]: e.target.value })
	}

	handleSubmit = async () => {
		const { email, password } = this.state
		const user = { email, password }

		const data = await fetchCall("auth/signin", "POST", null, user)

		if (data.status === "fail") {
			this.setState({ errors: data.payload })
			return setTimeout(() => this.setState({ errors: "" }), 3000)
		}

		if (data.status === "success") {
			this.props.login(data.payload)
			return this.setState({ redirect: true })
		}
	}

	renderMessage = () => {
		if (this.state.errors) {
			return (
				<div className="error">
					<h3>{this.state.errors}</h3>
				</div>
			)
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />
		}
		return (
			<section className="login page">
				<div className="card">
					<div className="header">
						<h1>PayEasy</h1>
					</div>
					<div className="input">
						<img src={user} alt="email" />
						<input
							type="email"
							placeholder="Email"
							onChange={(e) => this.handleChange("email", e)}
						/>
					</div>
					<div className="input">
						<img src={padlock} alt="password" />
						<input
							type="password"
							placeholder="Password"
							onChange={(e) => this.handleChange("password", e)}
						/>
					</div>
					{this.renderMessage()}
				</div>
				<h2>
					New to our app?{" "}
					<Link className="link" to="/register">
						SIGN UP
					</Link>
				</h2>
				<div className="login-btn" onClick={this.handleSubmit}>
					SIGN IN
				</div>
			</section>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	login: (userInfo) => dispatch(login(userInfo)),
})

export default connect(null, mapDispatchToProps)(LoginPage)
