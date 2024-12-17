const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).send("Welcome to Instagram-clone API");
});

app.listen(8000, () => {
	console.log("Server is running on port 8000");
});
