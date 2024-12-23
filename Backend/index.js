const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/db");
const userRoute = require("./routes/user.route");

const PORT = process.env.PORT || 8000;
const app = express();

// Middlewares
app.use(
	cors({
		origin: process.env.CLIENT_URL.split(",") || "http://localhost:5173/",
		credentials: true,
	})
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.status(200).send("Welcome to Instagram-clone API");
});
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});
