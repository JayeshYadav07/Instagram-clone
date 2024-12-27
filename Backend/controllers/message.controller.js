const Message = require("../models/message.model");
const User = require("../models/user.model");
const Conversation = require("../models/conversation.model");

const sendMessage = async (req, res) => {
	try {
		const senderId = req.userId;
		const receiverId = req.params.id;
		const { message } = req.body;

		if (!message) {
			return res.status(401).json({
				success: false,
				message: "message can't be empty!",
			});
		}

		// Check receiver available or not
		const isReceiverExist = await User.findById(receiverId);
		if (!isReceiverExist) {
			return res.status(400).json({
				success: false,
				message: "Receiver user not found!",
			});
		}

		// check conversation
		let conversation = await Conversation.findOne({
			participants: {
				$all: [senderId, receiverId],
			},
		});

		// create conversation
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
				messages: [],
			});
		}

		// send message
		const newMessage = await Message.create({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
			await conversation.save();
		}

		return res.status(200).json({
			success: true,
			message: "Message Sent successfully.",
		});
	} catch (error) {
		return res.status(401).send({
			success: false,
			message: error.message,
		});
	}
};

const getMessages = async (req, res) => {
	try {
		const senderId = req.userId;
		const receiverId = req.params.id;

		const conversation = await Conversation.findOne({
			participants: {
				$all: [senderId, receiverId],
			},
		}).populate({
			path: "messages",
			options: { sort: { createdAt: -1 } },
		});

		if (!conversation) {
			return res.status(401).json({
				success: false,
				message: "Conversation not found!",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Conversation found successfully.",
			data: conversation.messages,
		});
	} catch (error) {
		return res.status(401).send({
			success: false,
			message: error.message,
		});
	}
};
module.exports = {
	sendMessage,
	getMessages,
};
