const { upload } = require("../config/multerConfig");
const fs = require("mz/fs");
const Joi = require("joi");

const Recipe = require("../models/recipeModel");

const recipe = {
	uploadImage: upload,
	recipes: async (req, res) => {
		try {
			const data = await Recipe.find({}).populate(
				"userId",
				"userId name email"
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	recipe: async (req, res) => {
		try {
			const id = req.params.id;
			const data = await Recipe.findById(id).populate(
				"userId",
				"userId name email"
			);
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	add: async (req, res) => {
		try {
			const data = req.body;
			const schema = Joi.object({
				description: Joi.string().min(1).required(),
				ingredients: Joi.array().required(),
				instructions: Joi.string().required(),
				image: Joi.allow(""),
				link: Joi.string().allow(""),
				userId: Joi.string().required(),
			});
			const result = schema.validate(data);
			if (result.error) {
				return res.status(400).send(result.error.details[0].message);
			}
			const recipe = await Recipe.create(data);
			res.status(201).json(recipe);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	update: async (req, res) => {
		try {
			const id = req.params.id;
			const data = req.body;
			const schema = Joi.object({
				description: Joi.string().min(1).required(),
				ingredients: Joi.array().required(),
				instructions: Joi.string().required(),
				link: Joi.string().allow(""),
			});
			const result = schema.validate(data);
			if (result.error) {
				return res.status(400).send(result.error.details[0].message);
			}
			const recipe = await Recipe.findByIdAndUpdate(id, data).populate(
				"userId",
				"userId name email"
			);
			res.status(201).json(recipe);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	uploadUpdate: async (req, res) => {
		try {
			const id = req.params.id;
			const image = req.file.path;
			const data = { image: image };
			const recipe = await Recipe.findByIdAndUpdate(id, data).populate(
				"userId",
				"userId name email"
			);
			res.status(201).json(recipe);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	remove: async (req, res) => {
		try {
			const id = req.params.id;
			const data = await Recipe.findById(id);
			if (!data) {
				return res.status(400).send("Recipe does not exist");
			}
			const image = data.image;
			await Recipe.findByIdAndRemove(id);
			fs.exists(image).then(async (exists) => {
				if (exists) {
					await fs.unlink(image, (err) => {
						if (err) res.status(500).json({ message: error.message });
					});
				}
			});
			res.status(204).json();
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = recipe;
