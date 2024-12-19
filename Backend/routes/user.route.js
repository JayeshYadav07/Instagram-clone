const express = require("express");
const {
	register,
	login,
	logout,
	getProfile,
	updateProfile,
} = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { singleUpload } = require("../middlewares/multer");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/profile/:id", getProfile);

router.patch("/profile-update", isAuthenticated, singleUpload, updateProfile);

module.exports = router;
