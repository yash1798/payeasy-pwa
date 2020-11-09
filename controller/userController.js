const asyncHandler = require("express-async-handler")
const fetch = require("node-fetch")

const User = require("../models/userModel")
const AppError = require("../utils/errorHandler")

exports.getUser = asyncHandler(async (req, res) => {
	const { user } = req
	if (user) {
		return res.json({ status: "success", payload: user })
	}

	throw new AppError("Something went wrong, try again.", 500)
})

exports.getUserByNumber = asyncHandler(async (req, res) => {
	const { number } = req.params

	const user = await User.findOne({ tel_number: number })

	if (!user) {
		throw new AppError("Could not find the user.", 404)
	}

	if (user) {
		return res.json({
			status: "success",
			payload: { name: user.name, id: user._id },
		})
	}

	throw new AppError("Something went wrong, try again.", 500)
})

exports.updateUser = asyncHandler(async (req, res) => {
	const { userId } = req
	const {
		name,
		email,
		password,
		cardNumber,
		cardName,
		tel_number,
		date,
	} = req.body

	const user = await User.findById(userId)

	if (!user) {
		throw new AppError("User not found.", 404)
	}

	if (cardNumber && cardName && date) {
		bankDetails = { cardName, cardNumber, date }
		user.bankDetails = bankDetails
	}

	if (name) {
		user.name = name
	}

	if (email) {
		user.email = email
	}

	if (tel_number) {
		user.tel_number = tel_number
	}

	if (password) {
		const hashed_password = await bcrypt.hash(password, 10)

		user.hashed_password = hashed_password
	}

	await user.save(() => {
		res.json({
			status: "success",
			payload: "Profile Updated Successfully.",
		})
	})
})

exports.addMoney = asyncHandler(async (req, res, next) => {
	const { userId } = req
	const { card, cvv, date, name, amount } = req.body

	if (card !== process.env.card) {
		throw new AppError("Invalid credentials.", 400)
	}
	if (cvv !== process.env.cvv) {
		throw new AppError("Invalid credentials.", 400)
	}
	if (date !== process.env.date) {
		throw new AppError("Invalid credentials.", 400)
	}
	if (name !== process.env.name) {
		throw new AppError("Invalid credentials.", 400)
	}

	const wallet = { amount: amount, type: "CREDIT" }

	const data = await fetch(
		`${process.env.API_URL}/user/updateWallet/${userId}`,
		{
			method: "PUT",
			headers: {
				Authorization: `${process.env.NODE_SECRET}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(wallet),
		}
	).then((response) => response.json())

	if (data.status === "success") {
		return res.json({ status: "success", payload: data.payload })
	}

	if (data.status === "fail") {
		throw new AppError("Something went wrong.", 500)
	}
})

exports.updateWallet = asyncHandler(async (req, res) => {
	const { userId } = req.params

	const { type, amount } = req.body

	let user = await User.findById(userId)

	if (!user) {
		throw new AppError("User not found.", 404)
	}

	if (!user.walletBalance) {
		user.walletBalance = 0
	}

	if (type === "CREDIT") {
		user.walletBalance = user.walletBalance + parseInt(amount)
	}

	if (type === "DEBIT") {
		if (user.walletBalance == 0 || user.walletBalance < amount) {
			throw new AppError("Cannot deduct money", 400)
		}

		user.walletBalance = user.walletBalance - parseInt(amount)
	}

	await user.save(() => {
		res.json({
			status: "success",
			payload: { walletBalance: user.walletBalance },
		})
	})
})
