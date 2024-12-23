const express = require("express");
const {
	register,
	login,
	logout,
	getProfile,
	updateProfile,
	getSuggestedUsers,
	followUser,
	unfollowUser,
} = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/profile/:id", getProfile);

router.patch(
	"/profile-update",
	isAuthenticated,
	upload.single("file"),
	updateProfile
);

router.get("/suggested-users", isAuthenticated, getSuggestedUsers);

router.post("/follow-user/:id", isAuthenticated, followUser);

router.post("/unfollow-user/:id", isAuthenticated, unfollowUser);

module.exports = router;
