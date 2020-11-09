const expressAsyncHandler = require("express-async-handler")
const fetch = require("node-fetch")

const AppError = require("../utils/errorHandler")
const Transaction = require("../models/transactionModel")

exports.createTransaction = expressAsyncHandler(async (req, res) => {
	const { toUser, amount } = req.body

	const fromUser = req.userId

	if (fromUser === toUser) {
		throw new AppError("You cannot send money to yourself.", 400)
	}

	let data = await fetch(
		`${process.env.API_URL}/user/updateWallet/${fromUser}`,
		{
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: process.env.NODE_SECRET,
			},
			body: JSON.stringify({ type: "DEBIT", amount }),
		}
	).then((response) => response.json())

	if (data.status === "fail") {
		throw new AppError(`Something went wrong ${data.payload}`, 500)
	}

	if (data.status === "success") {
		data = await fetch(`${process.env.API_URL}/user/updateWallet/${toUser}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: process.env.NODE_SECRET,
			},
			body: JSON.stringify({ type: "CREDIT", amount }),
		}).then((response) => response.json())

		if (data.status === "success") {
			const transaction = await Transaction.create({
				fromUser,
				toUser,
				amount,
			})
			return res.json({ status: "success", payload: transaction })
		}

		if (data.status === "fail") {
			throw new AppError(`Something went wrong ${data.payload}`, 500)
		}
	}
})

exports.getTransactionList = expressAsyncHandler(async (req, res) => {
	const { userId } = req

	const transactionList = await Transaction.find({
		$or: [{ fromUser: userId }, { toUser: userId }],
	})
		.select("-createdAt -updatedAt -__v")
		.populate("toUser", "name")
		.populate("fromUser", "name")
		.sort([["createdAt", -1]])

	if (transactionList) {
		return res.json({ status: "success", payload: transactionList })
	}
})

exports.getTransaction = expressAsyncHandler(async (req, res) => {
	const { transactionId } = req.params
	const { userId } = req

	const transaction = await Transaction.findById(transactionId).select(
		"-__v -updatedAt"
	)

	if (!transaction) {
		throw new AppError("Transaction Not Found", 404)
	}

	const toShow = userId == transaction.fromUser || userId == transaction.toUser

	if (!toShow) {
		throw new AppError("Unauthorized Access.", 400)
	}

	return res.json({ status: "success", payload: transaction })
})
