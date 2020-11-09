import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import "../../styles/homepage.css"
import add from "../../assets/add.svg"
import send from "../../assets/send.svg"
import transaction from "../../assets/transaction.svg"

import fetchCall from "../../utils/fetchCall"
import { getUser } from "../../redux/actions/userAction"

import Header from "../functional/Header"

export class HomePage extends Component {
	async componentDidMount() {
		const data = await fetchCall(
			"user/getUser",
			"GET",
			this.props.userInfo.user.token,
			null
		)

		if (data.status === "success") {
			return this.props.getUser(data.payload)
		}
	}
	render() {
		return (
			<>
				<Header />
				<section className=" page homepage">
					<div className="card">
						<h2>
							Available <span>Balance</span>
						</h2>
						<h3>$ {this.props.userInfo.user.walletBalance}</h3>
					</div>
					<div className="home-options">
						<div className="option">
							<img src={send} alt="send money" />
							<Link className="link" to="/send-money">
								<h4>Send Money</h4>
							</Link>
						</div>
						<div className="option">
							<img src={add} alt="add money" />
							<Link className="link" to="/add-money">
								<h4>Add Money</h4>
							</Link>
						</div>
						<div className="option">
							<img src={transaction} alt="send money" />
							<Link className="link" to="/view-receipts">
								<h4>View Receipts</h4>
							</Link>
						</div>
					</div>
				</section>
			</>
		)
	}
}

const mapStateToProps = ({ userInfo }) => ({
	userInfo,
})

const mapDispatchToProps = (dispatch) => ({
	getUser: (user) => dispatch(getUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
