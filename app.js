const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")

const authRoutes = require("./route/authRoutes")
const userRoutes = require("./route/userRoutes")
const transactionRoutes = require("./route/transactionRoutes")

const mongooseConnect = require("./utils/mongooseConnect")
const errorController = require("./controller/errorController")

dotenv.config()

const app = express()

mongooseConnect(process.env.MONGO_URI, process.env.MODE)

if (process.env.MODE === "DEVELOPMENT") {
	app.use(morgan("dev"))
}

app.use(bodyParser.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/transaction", transactionRoutes)

app.use(errorController)

const dirname = path.resolve()

if (process.env.MODE === "PRODUCTION") {
	app.use(express.static(path.join(dirname, "/frontend/build")))
	app.use("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	)
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`))
