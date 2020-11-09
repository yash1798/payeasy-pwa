const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const AppError = require("../utils/errorHandler")

exports.checkToken = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers

	const token = authorization.split(" ")[1]

	const decoded = await jwt.verify(token, process.env.JWT_SECRET)

	if (!decoded) {
		throw new AppError("Token fail.", 400)
	}

	req.userId = decoded.id

	next()
})

exports.attachUser = asyncHandler(async (req, res, next) => {
	const { userId } = req

	const user = await User.findById(userId).select("-hashed_password -__v")

	if (!user) {
		throw new AppError("User not found.", 404)
	}

	req.user = user
	next()
})

exports.checkSecret = asyncHandler(async (req, res, next) => {
	const { authorization } = req.headers

	if (authorization !== process.env.NODE_SECRET) {
		throw new AppError("Unauthorize access.", 400)
	}

	next()
})
