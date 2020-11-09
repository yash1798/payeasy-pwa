import { combineReducers } from "redux"

import { userReducer } from "./reducers/userReducer"
import { walletReducer } from "./reducers/walletReducer"

const reducer = combineReducers({
	userInfo: userReducer,
	walletInfo: walletReducer,
})

export default reducer
