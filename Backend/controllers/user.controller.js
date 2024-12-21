const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Follower = require("../models/follower.model");
const uploadStream = require("../utils/uploadFile");

const register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		if (!username || !email || !password) {
			return res.status(401).json({
				success: false,
				message: "All fields are required!",
			});
		}

		const user = await User.findOne({
			$or: [{ username: username }, { email: email }],
		});

		if (user) {
			if (user.username == username) {
				return res.status(401).json({
					success: false,
					message: "Username already exists!",
				});
			}

			if (user.email == email) {
				return res.status(401).json({
					success: false,
					message: "Email already exists!",
				});
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		return res.status(200).json({
			success: true,
			message: "User registered successfully!",
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		if (!username || !password) {
			return res.status(401).json({
				success: false,
				message: "All fields are required!",
			});
		}

		const user = await User.findOne({
			$or: [{ username: username }, { email: username }],
		});

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not found!",
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials!",
			});
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});

		const cookieOptions = {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		};

		const userDetails = {
			_id: user._id,
			username: user.username,
			email: user.email,
			profilePic: user.profilePic,
			bio: user.bio,
		};

		return res
			.cookie("token", token, cookieOptions)
			.status(200)
			.json({
				success: true,
				message: `Welcome back ${userDetails.username}!`,
				data: userDetails,
			});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const logout = async (req, res) => {
	return res.cookie("token", null, { maxAge: 0 }).status(200).json({
		success: true,
		message: "Logged out successfully!",
	});
};

const getProfile = async (req, res) => {
	const id = req.params.id;
	try {
		// Fetch user basic details
		const user = await User.findById(id, { password: 0 });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not found!",
			});
		}

		// Fetch followers and following

		// Fetch posts

		return res.status(200).json({
			success: true,
			message: "Profile fetched successfully!",
			data: user,
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const updateProfile = async (req, res) => {
	const id = req.userId;
	try {
		const { username, email, bio } = req.body;

		const user = await User.findById(id);

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "User not found!",
			});
		}

		const file = req.file;

		const result = await uploadStream(file.buffer, "image");

		user.username = username || user.username;
		user.email = email || user.email;
		user.bio = bio || user.bio;
		user.profilePic = result.secure_url || user.profilePic;
		await user.save();

		return res.status(200).json({
			success: true,
			message: "Profile updated successfully!",
			data: user,
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const getSuggestedUsers = async (req, res) => {
	try {
		const users = await User.find(
			{ _id: { $ne: req.userId } },
			{ password: 0 }
		);

		if (!users) {
			return res.status(401).json({
				success: false,
				message: "Users not found!",
			});
		}
		return res.status(200).json({
			success: true,
			message: "Users fetched successfully!",
			data: users,
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const followUser = async (req, res) => {
	try {
		const userId = req.userId;
		const followingId = req.params.id;

		const [user, followingUser] = await Promise.all([
			User.findById(userId),
			User.findById(followingId),
		]);

		if (!user || !followingUser) {
			return res.status(401).json({
				success: false,
				message: "User not found!",
			});
		}

		// check if user is already following
		const isFollowing = await Follower.findOne({
			author: userId,
			following: followingId,
		});

		if (isFollowing) {
			return res.status(401).json({
				success: false,
				message: "You are already following this user!",
			});
		}

		await Promise.all([
			Follower.findOneAndUpdate(
				{ author: userId },
				{
					author: userId,
					$push: { following: followingId },
				},
				{ upsert: true }
			),
			Follower.findOneAndUpdate(
				{ author: followingId },
				{
					author: followingId,
					$push: { following: userId },
				},
				{ upsert: true }
			),
		]);

		return res.status(200).json({
			success: true,
			message: "User followed successfully!",
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

const unfollowUser = async (req, res) => {
	try {
		const userId = req.userId;
		const followingId = req.params.id;

		const [user, followingUser] = await Promise.all([
			User.findById(userId),
			User.findById(followingId),
		]);

		if (!user || !followingUser) {
			return res.status(401).json({
				success: false,
				message: "User not found!",
			});
		}

		// check if user is already following
		const isFollowing = await Follower.findOne({
			author: userId,
			following: followingId,
		});

		if (!isFollowing) {
			return res.status(401).json({
				success: false,
				message: "You are not following this user!",
			});
		}

		await Promise.all([
			Follower.findOneAndUpdate(
				{ author: userId },
				{
					author: userId,
					$pull: { following: followingId },
				}
			),
			Follower.findOneAndUpdate(
				{ author: followingId },
				{
					author: followingId,
					$pull: { following: userId },
				}
			),
		]);

		return res.status(200).json({
			success: true,
			message: "User unfollowed successfully!",
		});
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: error.message,
		});
	}
};

module.exports = {
	register,
	login,
	logout,
	getProfile,
	updateProfile,
	getSuggestedUsers,
	followUser,
	unfollowUser,
};
