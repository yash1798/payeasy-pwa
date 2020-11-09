import React from "react"
import "../../styles/homepage.css"

const IntroCard = ({ img, desc, number }) => {
	return (
		<>
			<h1>
				<span>{number}</span> / 5
			</h1>
			<div className="intro-card">
				<img src={img} alt="" />
				<p>{desc}</p>
			</div>
		</>
	)
}

export default IntroCard
