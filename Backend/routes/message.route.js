const express = require("express");
const {
	sendMessage,
	getMessages,
} = require("../controllers/message.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.post("/send/:id", isAuthenticated, sendMessage);
router.get("/get/:id", isAuthenticated, getMessages);

module.exports = router;
