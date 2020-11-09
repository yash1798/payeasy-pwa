import React, { Component } from "react"
import { Link } from "react-router-dom"

import "../../styles/register.css"
import name from "../../assets/name.svg"
import user from "../../assets/user.svg"
import padlock from "../../assets/padlock.svg"

import fetchCall from "../../utils/fetchCall"

export class Register extends Component {
	state = {
		name: "",
		password: "",
		email: "",
		errors: "",
		msg: "",
	}

	handleChange = (input, e) => {
		this.setState({ [input]: e.target.value })
	}

	handleSubmit = async () => {
		const { name, email, password } = this.state
		const user = { name, email, password }
		const data = await fetchCall("auth/signup", "POST", null, user)

		if (data.status === "fail") {
			this.setState({ errors: data.payload })
			return setTimeout(() => this.setState({ errors: "" }), 3000)
		}
		if (data.status === "success") {
			this.setState({
				msg: "Please login now to continue with our app.",
			})
			return setTimeout(
				() =>
					this.setState({
						msg: "",
					}),
				5000
			)
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

		if (this.state.msg) {
			return (
				<div className="message">
					<h3>{this.state.msg}</h3>
				</div>
			)
		}
	}

	render() {
		return (
			<section className="register page">
				<div className="card">
					<div className="header">
						<h1>PayEasy</h1>
					</div>
					<div className="input">
						<img src={name} alt="name" />
						<input
							type="text"
							placeholder="Name"
							onChange={(e) => this.handleChange("name", e)}
						/>
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
					Already with an account?{" "}
					<Link className="link" to="/login">
						SIGN IN
					</Link>
				</h2>
				<div className="login-btn" onClick={this.handleSubmit}>
					SIGN UP
				</div>
			</section>
		)
	}
}

export default Register
