const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
	{
		fromUser: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		toUser: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		amount: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const Transaction = mongoose.model("Transaction", transactionSchema)

module.exports = Transaction
