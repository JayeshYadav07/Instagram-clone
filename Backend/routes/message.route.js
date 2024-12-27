const express = require("express");
const { sendMessage } = require("../controllers/message.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.post("/send/:id", isAuthenticated, sendMessage);

module.exports = router;
