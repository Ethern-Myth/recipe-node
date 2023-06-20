const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: "5000000" },
	fileFilter: (req, file, cb) => {
		const fileTypes = /jpeg|jpg|png|gif/;
		const mimeType = fileTypes.test(file.mimetype);
		const extName = fileTypes.test(path.extname(file.originalname));
		if (mimeType && extName) {
			return cb(null, true);
		}
		cb("Format Only Supported: JPEG, JPG, PNG, GIF");
	},
}).single("image");

module.exports = { upload };
