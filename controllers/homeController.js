const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const User = require("../models/userModel");

const home = {
	login: async (req, res) => {
		const data = req.body;
		const schema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
		const result = schema.validate(data);
		if (result.error) {
			return res.status(400).send(result.error.details[0].message);
		}
		const authDetails = await User.findOne({ email: data.email });
		if (
			!authDetails ||
			!bcrypt.compareSync(data.password, authDetails.password)
		) {
			return res.status(401).json({
				message: "Authentication failed. Invalid email or password",
			});
		}
		const token = jwt.sign({ data }, "my_secret_key");
		res
			.status(200)
			.json({ id: authDetails._id, name: authDetails.name, ...data, token });
	},

	register: async (req, res) => {
		try {
			const form = req.body;
			const schema = Joi.object({
				name: Joi.string().min(3).required(),
				email: Joi.string().email().required(),
				password: Joi.string().min(5).required(),
			});
			const result = schema.validate(form);

			if (result.error) {
				return res.status(400).send(result.error.details[0].message);
			}
			const data = {
				name: form.name,
				email: form.email,
				password: bcrypt.hashSync(form.password, 10),
			};
			const existingEmail = await User.findOne({ email: data.email });
			if (existingEmail)
				return res.status(400).json({ message: "email already registered" });
			const user = await User.create(data);
			res.status(201).json(user);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = home;
