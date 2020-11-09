import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from "redux-logger"

import reducer from "./mainReducer"

const thunk = require("redux-thunk").default

const logger = createLogger()

if (localStorage.getItem("user")) {
	var userInfo = {
		user: JSON.parse(localStorage.getItem("user")),
		loggedIn: true,
	}
} else {
	userInfo = {
		user: {},
		loggedIn: false,
	}
}

const wallet = JSON.parse(localStorage.getItem("wallet"))

if (!wallet) {
	var walletInfo = {
		addMoney: null,
		sendMoney: null,
	}
}

if (wallet) {
	walletInfo = {
		addMoney: wallet.addMoney,
		sendMoney: wallet.sendMoney,
	}
}

const initialState = { userInfo, walletInfo }

const middleware = [logger, thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
