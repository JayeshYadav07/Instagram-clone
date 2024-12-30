const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/db");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const messageRoute = require("./routes/message.route");

const PORT = process.env.PORT || 8000;
const app = express();
const corsOptions = {
	origin: process.env.CLIENT_URL.split(",") || "http://localhost:5173",
	credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
	res.status(200).send("Welcome to Instagram-clone API");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});
