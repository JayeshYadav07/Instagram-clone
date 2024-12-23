const express = require("express");
const {
	addPost,
	getAllPosts,
	addComment,
	getUserPosts,
} = require("../controllers/post.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const router = express.Router();

router.get("/", isAuthenticated, getUserPosts);

router.get("/all", isAuthenticated, getAllPosts);

router.post("/add", isAuthenticated, upload.single("file"), addPost);

router.post("/comment/:id", isAuthenticated, addComment);

module.exports = router;
