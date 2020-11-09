export const walletReducer = (state = { addMoney: null }, action) => {
	const { type, payload } = action
	switch (type) {
		case "ADD_MONEY_WALLET":
			var wallet = JSON.parse(localStorage.getItem("wallet"))
			wallet.addMoney = payload
			localStorage.setItem("wallet", JSON.stringify(wallet))
			return { ...state, addMoney: payload }
		case "SEND_MONEY_WALLET":
			wallet = JSON.parse(localStorage.getItem("wallet"))
			wallet.sendMoney = payload
			localStorage.setItem("wallet", JSON.stringify(wallet))
			return { ...state, sendMoney: payload }
		default:
			return state
	}
}
