export const userReducer = (state = {}, action) => {
	const { type, payload } = action
	switch (type) {
		case "USER_LOGIN_SUCCESS":
			localStorage.setItem("user", JSON.stringify(payload))
			localStorage.setItem(
				"wallet",
				JSON.stringify({ addMoney: null, sendMoney: null })
			)
			return { user: payload, loggedIn: true }
		case "USER_GET_SUCCESS":
			const user = JSON.parse(localStorage.getItem("user"))
			user.email = payload.email
			user.walletBalance = payload.walletBalance
			localStorage.setItem("user", JSON.stringify(user))
			return { user: user, loggedIn: true }
		case "USER_LOGOUT":
			localStorage.removeItem("user")
			localStorage.removeItem("wallet")
			return { ...state, userInfo: { user: {}, loggedIn: false } }
		default:
			return state
	}
}
