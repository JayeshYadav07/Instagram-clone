const uploadStream = require("../utils/uploadFile");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const addPost = async (req, res) => {
	try {
		const { caption } = req.body;
		const file = req.file;
		const userId = req.userId;

		if (!caption || !file) {
			return res.status(401).json({
				success: false,
				message: "All fields are required!",
			});
		}

		const result = await uploadStream(file.buffer, "auto");

		if (!result) {
			return res.status(401).json({
				success: false,
				message: "Post not created!",
			});
		}

		const post = await Post.create({
			author: userId,
			post_url: result.secure_url,
			caption: caption,
		});

		return res.status(200).json({
			success: true,
			message: "Post created successfully!",
			data: post,
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find()
			.sort({ createdAt: -1 })
			.populate({
				path: "author",
				select: "username profilePic",
			})
			.populate({
				path: "comments",
				populate: {
					path: "author",
					select: "username profilePic",
				},
			});
		return res.status(200).json({
			success: true,
			message: "Posts fetched successfully!",
			data: posts,
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const getUserPosts = async (req, res) => {
	try {
		const userId = req.userId;
		const posts = await Post.find({ author: userId })
			.sort({ createdAt: -1 })
			.populate({
				path: "author",
				select: "username profilePic",
			})
			.populate({
				path: "comments",
				populate: {
					path: "author",
					select: "username profilePic",
				},
			});
		return res.status(200).json({
			success: true,
			message: "Posts fetched successfully!",
			data: posts,
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const addComment = async (req, res) => {
	try {
		const { comment } = req.body;
		const userId = req.userId;
		const postId = req.params.id;

		if (!comment || !userId || !postId) {
			return res.status(401).json({
				success: false,
				message: "All fields are required!",
			});
		}

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(401).json({
				success: false,
				message: "Post not found!",
			});
		}

		const newComment = await Comment.create({
			author: userId,
			post: postId,
			comment: comment,
		});

		post.comments.push(newComment);

		await post.save();

		return res.status(200).json({
			success: true,
			message: "Comment added successfully!",
			data: newComment,
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = { addPost, getAllPosts, getUserPosts, addComment };