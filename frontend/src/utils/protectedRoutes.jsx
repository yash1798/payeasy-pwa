import React from "react"

import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"

const ProtectedRoutes = ({ component: Component, userInfo, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (!userInfo.loggedIn) {
					return <Redirect to="/" />
				}
				if (userInfo.loggedIn) {
					return <Component {...props} />
				}
			}}
		/>
	)
}

const mapStateToProps = ({ userInfo }) => ({
	userInfo,
})

export default connect(mapStateToProps)(ProtectedRoutes)
