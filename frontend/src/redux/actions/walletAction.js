export const addMoneyWallet = (amount) => async (dispatch) => {
	dispatch({
		type: "ADD_MONEY_WALLET",
		payload: amount,
	})
}

export const sendMoneyWallet = (amount) => async (dispatch) => {
	dispatch({
		type: "SEND_MONEY_WALLET",
		payload: amount,
	})
}
