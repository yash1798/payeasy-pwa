const express = require("express")
const { signup, signin } = require("../controller/authController")

const {
	signupRules,
	validate,
	checkEmail,
} = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/signup", signupRules(), validate, checkEmail, signup)
router.post("/signin", signin)

module.exports = router
