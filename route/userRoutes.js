const express = require("express")
const {
	getUser,
	updateUser,
	updateWallet,
	addMoney,
	getUserByNumber,
} = require("../controller/userController")
const {
	attachUser,
	checkToken,
	checkSecret,
} = require("../middlewares/userMiddlewares")

const router = express.Router()

router.get("/getUser", checkToken, attachUser, getUser)
router.get("/getUser/:number", getUserByNumber)
router.put("/updateUser", checkToken, updateUser)
router.put("/updateWallet/:userId", checkSecret, updateWallet)
router.put("/addMoney", checkToken, addMoney)

module.exports = router
