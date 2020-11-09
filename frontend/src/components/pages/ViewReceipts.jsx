import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import "../../styles/view-receipts.css"
import plus from "../../assets/plus.png"
import minus from "../../assets/negative.png"

import Header from "../functional/Header"
import fetchCall from "../../utils/fetchCall"

export class ViewReceipts extends Component {
	state = {
		toShow: "all",
		transactionList: [],
	}

	async componentDidMount() {
		const data = await fetchCall(
			"transaction/getTransactions",
			"GET",
			this.props.userInfo.user.token
		)

		if (data.status === "success") {
			this.setState({ transactionList: data.payload })
		}
	}

	showActive = (id) => {
		var element = document.getElementById(id)
		element.classList.add("active")
		this.setState({ toShow: id })

		const idArray = ["all", "credit", "debit"]

		const elements = idArray.filter((element) => element !== id)

		elements.forEach((element) => {
			const el = document.getElementById(element)
			el.classList.remove("active")
		})
	}

	renderList = () => {
		const { transactionList } = this.state

		if (this.state.toShow === "all") {
			var listToShow = transactionList
		}

		if (this.state.toShow === "credit") {
			listToShow = transactionList.filter(
				(trans) => trans.toUser._id === this.props.userInfo.user.id
			)
		}

		if (this.state.toShow === "debit") {
			listToShow = transactionList.filter(
				(trans) => trans.fromUser._id === this.props.userInfo.user.id
			)
		}

		return listToShow.map((transaction) => (
			<div key={transaction._id} className="card transaction-card">
				<img
					src={
						transaction.fromUser._id === this.props.userInfo.user.id
							? minus
							: plus
					}
					alt="payment-type"
				/>
				<h1
					style={{
						color:
							transaction.toUser._id === this.props.userInfo.user.id
								? "green"
								: "red",
					}}
				>
					{transaction.toUser._id === this.props.userInfo.user.id
						? `From ${transaction.fromUser.name}`
						: `To ${transaction.toUser.name}`}
				</h1>
				<h2
					style={{
						color:
							transaction.toUser._id === this.props.userInfo.user.id
								? "green"
								: "red",
					}}
				>
					{transaction.amount}
				</h2>
			</div>
		))
	}

	render() {
		return (
			<>
				<Header />
				<section className="view-receipts page">
					<div className="card menu">
						<h1
							id="all"
							className="active"
							onClick={() => this.showActive("all")}
						>
							All
						</h1>
						<h1 id="credit" onClick={() => this.showActive("credit")}>
							Credit
						</h1>
						<h1 id="debit" onClick={() => this.showActive("debit")}>
							Debit
						</h1>
					</div>
					{this.renderList()}
				</section>
			</>
		)
	}
}

const mapStateToProps = ({ userInfo }) => ({
	userInfo,
})

export default connect(mapStateToProps)(ViewReceipts)
