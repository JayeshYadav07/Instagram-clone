const express = require("express");
const {
	addPost,
	getAllPosts,
	addComment,
	getUserPosts,
	likePost,
	dislikePost,
	deletePost,
	getAllCommentsOfPost,
	bookmarkPost,
} = require("../controllers/post.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");
const upload = require("../middlewares/multer");
const router = express.Router();

router.post("/add", isAuthenticated, upload.single("file"), addPost);

router.get("/all", isAuthenticated, getAllPosts);

router.get("/user", isAuthenticated, getUserPosts);

router.post("/like/:id", isAuthenticated, likePost);

router.post("/dislike/:id", isAuthenticated, dislikePost);

router.post("/comment/:id", isAuthenticated, addComment);

router.get("/comments/:id", isAuthenticated, getAllCommentsOfPost);

router.delete("/delete/:id", isAuthenticated, deletePost);

router.post("/bookmark/:id", isAuthenticated, bookmarkPost);

module.exports = router;
