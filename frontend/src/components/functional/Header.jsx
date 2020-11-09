import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import "../../styles/header.css"

import profile from "../../assets/profile.svg"
import list from "../../assets/list.svg"
import credit from "../../assets/credit-card.svg"
import logoutIcon from "../../assets/logout.svg"
import personal from "../../assets/personal-information.svg"
import dashboard from "../../assets/dashboard.svg"
import close from "../../assets/close.svg"

import { logout } from "../../redux/actions/userAction"

const Header = ({ userInfo, logout }) => {
	const renderMenu = () => {
		var element = document.getElementById("header-menu")

		element.classList.add("active")
	}

	const removeMenu = () => {
		var element = document.getElementById("header-menu")

		element.classList.remove("active")
	}

	const signout = () => {
		logout()
		window.location.reload()
	}

	return (
		<header className="home-header">
			<img src={profile} alt="profile" />
			<div id="header-menu" className="header-menu">
				<img
					className="close"
					onClick={() => removeMenu()}
					src={close}
					alt="close"
				/>
				<Link className="link" to="/">
					<div onClick={() => removeMenu()} className="menu-option">
						<img src={dashboard} alt="dashboard" />
						<h1>DASHBOARD</h1>
					</div>
				</Link>
				<Link className="link" to="/personal">
					<div onClick={() => removeMenu()} className="menu-option">
						<img src={personal} alt="personal" />
						<h1>PERSONAL INFORMATION</h1>
					</div>
				</Link>
				<Link onClick={() => removeMenu()} className="link" to="/card">
					<div className="menu-option">
						<img src={credit} alt="credit" />
						<h1>CARD INFORMATION</h1>
					</div>
				</Link>
				<div className="logout">
					<div className="login-btn" onClick={() => signout()}>
						LOGOUT
					</div>
					<img src={logoutIcon} alt="logout" />
				</div>
			</div>
			<h1>{userInfo.user.name}</h1>
			<img
				className="list"
				src={list}
				alt="menu"
				onClick={() => renderMenu()}
			/>
		</header>
	)
}

const mapStateToProps = ({ userInfo }) => ({
	userInfo,
})

const mapDispatchToProps = (dispatch) => ({
	logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
