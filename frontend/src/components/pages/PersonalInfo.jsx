import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Header from "../functional/Header"
import fetchCall from "../../utils/fetchCall"

import "../../styles/personal-info.css"
import name from "../../assets/cvv-name.svg"
import user from "../../assets/user.svg"
import padlock from "../../assets/padlock.svg"

export class PersonalInfo extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		errors: false,
		redirect: false,
	}

	handleChange = (input, e) => {
		return this.setState({ [input]: e.target.value })
	}

	async componentDidMount() {
		const data = await fetchCall(
			"user/getUser",
			"GET",
			this.props.userInfo.user.token
		)

		if (data.status === "success") {
			return this.setState({
				name: data.payload.name,
				email: data.payload.email,
			})
		}
	}

	handleSubmit = async () => {
		const { email, password, name } = this.state

		const data = await fetchCall(
			"user/updateUser",
			"PUT",
			this.props.userInfo.user.token,
			{ email, name, password }
		)

		if (data.status === "success") {
			return this.setState({ redirect: true })
		}
	}

	renderError = () => {
		if (this.state.errors) {
			setTimeout(() => this.setState({ errors: "" }), 3000)
			return (
				<div className="error">
					<h3>Enter all the fields.</h3>
				</div>
			)
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to="/" />
		}
		return (
			<>
				<Header />
				<section className="personal-info page">
					<h1>Edit your Info.</h1>
					<div className="card">
						{this.renderError()}
						<div className="input">
							<img src={name} alt="credit" />
							<input
								value={this.state.name}
								onChange={(e) => this.handleChange("name", e)}
								type="text"
								placeholder="Name"
							/>
						</div>
						<div className="input">
							<img src={user} alt="credit" />
							<input
								value={this.state.email}
								onChange={(e) => this.handleChange("email", e)}
								type="email"
								placeholder="Email"
							/>
						</div>
						<div className="input">
							<img src={padlock} alt="credit" />
							<input
								value={this.state.password}
								onChange={(e) => this.handleChange("password", e)}
								type="password"
								placeholder="Password"
							/>
						</div>
					</div>
					<div className="login-btn" onClick={this.handleSubmit}>
						UPDATE
					</div>
				</section>
			</>
		)
	}
}

const mapStateToProps = ({ userInfo }) => ({
	userInfo,
})

export default connect(mapStateToProps)(PersonalInfo)
