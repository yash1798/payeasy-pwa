import React, { Component } from "react"
import { connect } from "react-redux"

import Header from "../functional/Header"

import "../../styles/enter-number.css"
import phone from "../../assets/phone.svg"
import check from "../../assets/check.svg"
import fetchCall from "../../utils/fetchCall"
import { Redirect } from "react-router-dom"

export class EnterNumber extends Component {
	state = {
		number: "",
		name: "",
		toUser: "",
		errors: "",
		renderSuccess: false,
		redirect: false,
	}

	handleChange = (e) => {
		this.setState({ number: e.target.value })
	}

	handleCheck = async () => {
		const data = await fetchCall(`user/getUser/${this.state.number}`, "GET")

		if (data.status === "success") {
			this.setState({ name: data.payload.name, toUser: data.payload.id })
		}

		if (data.status === "fail") {
			this.setState({ errors: data.payload, number: "", name: "" })
		}
	}

	handleSubmit = async () => {
		if (this.state.name) {
			const body = {
				toUser: this.state.toUser,
				amount: this.props.walletInfo.sendMoney,
			}

			const data = await fetchCall(
				`transaction/createTransaction`,
				"POST",
				this.props.userInfo.user.token,
				body
			)

			if (data.status === "fail") {
				return this.setState({ errors: data.payload })
			}

			if (data.status === "success") {
				this.setState({ renderSuccess: true })
				return setTimeout(() => {
					this.setState({ redirect: true })
				}, 2000)
			}
		}
	}

	renderName = () => {
		if (!this.state.name) {
			return null
		}

		return <span>to {this.state.name}</span>
	}

	renderBtn = () => {
		if (!this.state.name) {
			return (
				<div className="login-btn" onClick={this.handleCheck}>
					CHECK
				</div>
			)
		}

		return (
			<div className="login-btn" onClick={this.handleSubmit}>
				SEND
			</div>
		)
	}

	renderSuccess = () => {
		if (this.state.renderSuccess) {
			return (
				<div className="success">
					<h2>Success</h2>
					<img src={check} alt="check" />
				</div>
			)
		}
	}

	renderError = () => {
		if (this.state.errors) {
			setTimeout(() => {
				this.setState({ errors: "" })
			}, 4000)
			return (
				<div className="error">
					<h3>Could not find a user with this number. </h3>
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
				<section className="enter-number page">
					<h1>Enter the reciever's number.</h1>
					{this.renderSuccess()}
					{this.renderError()}
					<div className="card">
						<div className="input">
							<img src={phone} alt="phone" />
							<input
								type="number"
								placeholder="Phone Number"
								value={this.state.number}
								onChange={(e) => this.handleChange(e)}
							/>
						</div>
						<div className="message">
							<h3>
								You are sending $ {this.props.walletInfo.sendMoney}{" "}
								{this.renderName()}.
							</h3>
						</div>
					</div>
					{this.renderBtn()}
				</section>
			</>
		)
	}
}

const mapStateToProps = ({ userInfo, walletInfo }) => ({
	userInfo,
	walletInfo,
})

export default connect(mapStateToProps)(EnterNumber)
