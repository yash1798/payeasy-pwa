const mongoose = require("mongoose")

module.exports = (uri, mode) => {
	mongoose
		.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then(() =>
			mode === "DEVELOPMENT" ? console.log("Connected To Database.") : null
		)
}
