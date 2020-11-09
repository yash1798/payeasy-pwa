import React from "react"

import pageNotFound from "../../assets/404.svg"

const Error404 = () => {
	return (
		<section className="error-page page">
			<img src={pageNotFound} alt="page-not-found" />
			<h1>Error 404: Page not found.</h1>
		</section>
	)
}

export default Error404
