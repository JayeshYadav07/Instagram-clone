const uploadStream = require("../utils/uploadFile");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
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

		await User.updateOne({ _id: userId }, { $push: { posts: post._id } });
		await post.populate({ path: "author", select: "-password" });

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
		await newComment.populate({
			path: "author",
			select: "username profilePic",
		});

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

const likePost = async (req, res) => {
	try {
		const userId = req.userId;
		const postId = req.params.id;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(401).json({
				success: false,
				message: "Post not found!",
			});
		}

		if (post.likes.includes(userId)) {
			return res.status(401).json({
				success: false,
				message: "You have already liked this post!",
			});
		}

		await Post.updateOne({ _id: postId }, { $push: { likes: userId } });

		return res.status(200).json({
			success: true,
			message: "Post liked successfully!",
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const dislikePost = async (req, res) => {
	try {
		const userId = req.userId;
		const postId = req.params.id;

		const post = await Post.findById(postId);
		if (!post) {
			return res.status(401).json({
				success: false,
				message: "Post not found!",
			});
		}

		if (!post.likes.includes(userId)) {
			return res.status(401).json({
				success: false,
				message: "You have not liked this post!",
			});
		}

		await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });

		return res.status(200).json({
			success: true,
			message: "Post disliked successfully!",
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const getAllCommentsOfPost = async (req, res) => {
	try {
		const postId = req.params.id;
		const comments = await Comment.find({ post: postId })
			.populate({
				path: "author",
				select: "username profilePic",
			})
			.sort({ createdAt: -1 });
		return res.status(200).json({
			success: true,
			message: "Comments fetched successfully!",
			data: comments,
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const deletePost = async (req, res) => {
	try {
		const userId = req.userId;
		const postId = req.params.id;

		const post = await Post.findOne({ _id: postId, author: userId });

		if (!post) {
			return res.status(401).json({
				success: false,
				message: "Post not found!",
			});
		}

		await Promise.all([
			Post.deleteOne({ _id: postId }),
			Comment.deleteMany({ post: postId }),
			User.updateOne({ _id: userId }, { $pull: { posts: postId } }),
		]);

		return res.status(200).json({
			success: true,
			message: "Post deleted successfully!",
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const bookmarkPost = async (req, res) => {
	try {
		const userId = req.userId;
		const postId = req.params.id;

		const post = await Post.findById(postId);

		if (!post) {
			return res.status(401).json({
				success: false,
				message: "Post not found!",
			});
		}

		const user = await User.findById(userId);

		if (user.bookmarks.includes(postId)) {
			await User.updateOne(
				{ _id: userId },
				{ $pull: { bookmarks: postId } }
			);
			return res.status(200).json({
				success: true,
				message: "Post removed from bookmarks!",
			});
		} else {
			await User.updateOne(
				{ _id: userId },
				{ $push: { bookmarks: postId } }
			);
			return res.status(200).json({
				success: true,
				message: "Post added to bookmarks!",
			});
		}
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	addPost,
	getAllPosts,
	getUserPosts,
	likePost,
	dislikePost,
	addComment,
	getAllCommentsOfPost,
	deletePost,
	bookmarkPost,
};
