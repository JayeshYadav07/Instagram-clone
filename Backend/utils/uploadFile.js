const { v2: cloudinary } = require("cloudinary");
const { Readable } = require("stream");
require("dotenv").config();

// Configuration
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadStream = async (buffer, type) => {
	return new Promise((res, rej) => {
		const theTransformStream = cloudinary.uploader.upload_stream(
			{ resource_type: type },
			(err, result) => {
				if (err) return rej(err);
				res(result);
			}
		);
		let str = Readable.from(buffer);
		str.pipe(theTransformStream);
	});
};

module.exports = uploadStream;
