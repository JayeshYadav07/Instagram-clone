const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGODB_URL ||
				"mongodb://localhost:27017/instagram-clone"
		);
		console.log("Database connected");
	} catch (err) {
		console.log(err);
	}
};

module.exports = connectDB;
