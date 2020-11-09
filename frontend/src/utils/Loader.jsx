import React from "react"

import Loading from "../assets/Loading.svg"

const Loader = () => {
	return (
		<div className="loader">
			<img src={Loading} alt="loading" />
		</div>
	)
}

export default Loader
