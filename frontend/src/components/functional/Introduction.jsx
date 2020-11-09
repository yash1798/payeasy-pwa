import React from "react"
import { Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"

import "../../styles/homepage.css"
import piggy from "../../assets/piggy-bank.svg"
import person from "../../assets/person-transfer-money.svg"
import receipt from "../../assets/receipt.svg"
import wallet from "../../assets/wallet.svg"
import online from "../../assets/online-pay.svg"

import IntroCard from "../functional/IntroCard"

const Introduction = () => {
	return (
		<section className="introduction page">
			<Carousel
				interval={2000}
				controls={false}
				indicators={false}
				touch={true}
				slide={true}
			>
				<Carousel.Item>
					<IntroCard
						img={piggy}
						desc="Manage your money all right in one place."
						number="1"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<IntroCard
						img={receipt}
						desc="Keep track of your spendings."
						number="2"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<IntroCard
						img={person}
						desc="Sending money to loved ones made easy."
						number="3"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<IntroCard
						img={wallet}
						desc="Keep all your money in one place."
						number="4"
					/>
				</Carousel.Item>
				<Carousel.Item>
					<IntroCard
						img={online}
						desc="Pay online anywhere, anytime."
						number="5"
					/>
				</Carousel.Item>
			</Carousel>
			<div className="social-box">
				<Link className="link" to="/register">
					<h2>Create your account.</h2>
				</Link>
				<Link className="link" to="/login">
					<div className="login-btn">SIGN IN</div>
				</Link>
			</div>
		</section>
	)
}

export default Introduction
