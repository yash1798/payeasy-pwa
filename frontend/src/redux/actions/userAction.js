export const login = (user) => async (dispatch) => {
	dispatch({
		type: "USER_LOGIN_SUCCESS",
		payload: user,
	})
}

export const getUser = (user) => async (dispatch) => {
	dispatch({
		type: "USER_GET_SUCCESS",
		payload: user,
	})
}

export const logout = () => async (dispatch) => {
	dispatch({
		type: "USER_LOGOUT",
	})
}
