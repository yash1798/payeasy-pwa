const mongoose = require("mongoose")

const bankSchema = new mongoose.Schema({
	cardNumber: {
		type: String,
		required: true,
	},
	cardName: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
})

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		hashed_password: {
			type: String,
			required: true,
		},
		tel_number: {
			type: Number,
		},
		bankDetails: {
			type: bankSchema,
			required: false,
		},
		walletBalance: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
)

const User = mongoose.model("User", userSchema)

module.exports = User
