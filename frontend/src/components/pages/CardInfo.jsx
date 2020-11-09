import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import "../../styles/card-info.css"

import Header from "../functional/Header"
import fetchCall from "../../utils/fetchCall"

import credit from "../../assets/credit-card.svg"
import calendar from "../../assets/calendar.svg"
import name from "../../assets/cvv-name.svg"

export class CardInfo extends Component {
	state = {
		cardNum: "",
		name: "",
		date: "",
		errors: false,
		redirect: false,
	}

	handleChange = (input, e) => {
		return this.setState({ [input]: e.target.value })
	}

	handleSubmit = async () => {
		const { cardNum, name, date } = this.state

		if (!cardNum || !name || !date) {
			return this.setState({ errors: true })
		}
		const data = await fetchCall(
			"user/updateUser",
			"PUT",
			this.props.userInfo.user.token,
			{ cardNumber: cardNum, cardName: name, date }
		)

		if (data.status === "success") {
			return this.setState({ redirect: true })
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
				cardNum: data.payload.bankDetails.cardNumber,
				date: data.payload.bankDetails.date,
			})
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
				<section className="card-info page">
					<h1>Add your card</h1>
					<div className="card">
						{this.renderError()}
						<div className="input">
							<img src={credit} alt="credit" />
							<input
								value={this.state.cardNum}
								onChange={(e) => this.handleChange("cardNum", e)}
								type="text"
								placeholder="Card Number"
							/>
						</div>
						<div className="input">
							<img src={calendar} alt="credit" />
							<input
								value={this.state.date}
								onChange={(e) => this.handleChange("date", e)}
								type="text"
								placeholder="Date"
							/>
						</div>
						<div className="input">
							<img src={name} alt="credit" />
							<input
								value={this.state.name}
								onChange={(e) => this.handleChange("name", e)}
								type="text"
								placeholder="Name on the Card"
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

export default connect(mapStateToProps)(CardInfo)
