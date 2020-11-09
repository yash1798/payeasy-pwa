const { body, validationResult } = require("express-validator")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const AppError = require("../utils/errorHandler")

const signupRules = () => {
	return [
		body("name")
			.notEmpty()
			.withMessage("Please provide us with a valid name.")
			.isLength({ max: 30, min: 4 })
			.withMessage(
				"Name cannot be more than 30 characters or less than 4 characcters."
			),
		body("email")
			.notEmpty()
			.withMessage("Please provide us with a valid email.")
			.isEmail()
			.withMessage("Please provide us with a valid email.")
			.isLength({ max: 30 })
			.withMessage("Email cannot be more than 30 characters."),
		body("password")
			.notEmpty()
			.withMessage("Please provide us with a password.")
			.isLength({ max: 30, min: 6 })
			.withMessage(
				"Password cannot be more than 30 characters or less than 6 characters."
			),
	]
}

const validate = (req, res, next) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		return next()
	}
	const extractedErrors = []
	errors.array().map((err) => extractedErrors.push(err.msg))

	return res.status(422).json({
		status: "fail",
		payload: extractedErrors[0],
	})
}

const checkEmail = asyncHandler(async (req, res, next) => {
	const { email } = req.body
	const user = await User.findOne({ email })

	if (user) {
		throw new AppError("User already exists.")
	}

	next()
})

module.exports = {
	signupRules,
	validate,
	checkEmail,
}
