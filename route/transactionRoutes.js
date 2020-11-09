const express = require("express")
const {
	createTransaction,
	getTransactionList,
	getTransaction,
} = require("../controller/transactionController")
const { checkToken } = require("../middlewares/userMiddlewares")

const router = express.Router()

router.post("/createTransaction", checkToken, createTransaction)
router.get("/getTransactions", checkToken, getTransactionList)
router.get("/getTransaction/:transactionId", checkToken, getTransaction)

module.exports = router
