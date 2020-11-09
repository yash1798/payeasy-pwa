import React, { Component } from "react"
import { connect } from "react-redux"

import "../../styles/credit-card.css"
import calendar from "../../assets/calendar.svg"
import cvv from "../../assets/cvv.svg"
import name from "../../assets/cvv-name.svg"
import card from "../../assets/credit-card.svg"

import Header from "../functional/Header"
import fetchCall from "../../utils/fetchCall"
import { Redirect } from "react-router-dom"

export class CreditCard extends Component {
	state = {
		card: "",
		name: "",
		cvv: "",
		date: "",
		errors: "",
		redirect: false,
	}

	handleChange = (input, e) => {
		return this.setState({ [input]: e.target.value })
	}

	handleSubmit = async () => {
		const { card, name, cvv, date } = this.state
		const amount = this.props.walletInfo.addMoney

		const wallet = { amount, card, name, cvv, date }

		const data = await fetchCall(
			`user/addMoney`,
			"PUT",
			this.props.userInfo.user.token,
			wallet
		)

		if (data.status === "success") {
			return this.setState({ redirect: true })
		}

		if (data.status === "fail") {
			return this.setState({ errors: data.payload })
		}
	}

	async componentDidMount() {
		const data = await fetchCall(
			"user/getUser",
			"GET",
			this.props.userInfo.user.token
		)

		if (data.status === "success") {
			return this.setState({
				name: data.payload.bankDetails.cardName,
				card: data.payload.bankDetails.cardNumber,
				date: data.payload.bankDetails.date,
			})
		}
	}

	renderError = () => {
		if (this.state.errors) {
			setTimeout(() => this.setState({ errors: "" }), 4000)

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
			<>
				<Header />
				<section className="credit-card page">
					<h1>
						You are adding <span>$ {this.props.walletInfo.addMoney}</span>
					</h1>
					<div className="card">
						<h2>Enter your card's details.</h2>
						{this.renderError()}
						<div className="input">
							<img src={card} alt="card" />
							<input
								value={this.state.card}
								type="text"
								placeholder="Card Number"
								onChange={(e) => this.handleChange("card", e)}
							/>
						</div>
						<div className="input">
							<img src={calendar} alt="date" />
							<input
								type="text"
								value={this.state.date}
								placeholder="Date in MM/YY"
								onChange={(e) => this.handleChange("date", e)}
							/>
						</div>
						<div className="input">
							<img src={cvv} alt="cvv" />
							<input
								type="text"
								placeholder="CVV"
								value={this.state.cvv}
								onChange={(e) => this.handleChange("cvv", e)}
							/>
						</div>
						<div className="input">
							<img src={name} alt="name" />
							<input
								type="text"
								placeholder="Name on Card"
								value={this.state.name}
								onChange={(e) => this.handleChange("name", e)}
							/>
						</div>
					</div>
					<div className="login-btn" onClick={this.handleSubmit}>
						ADD MONEY
					</div>
				</section>
			</>
		)
	}
}

const mapStateToProps = ({ walletInfo, userInfo }) => ({
	walletInfo,
	userInfo,
})

export default connect(mapStateToProps)(CreditCard)
