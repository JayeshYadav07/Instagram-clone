const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			throw new Error();
		}

		const decode = jwt.verify(token, process.env.JWT_SECRET);

		if (!decode) {
			throw new Error();
		}

		req.userId = decode.userId;
		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Please login first!",
		});
	}
};

module.exports = isAuthenticated;
