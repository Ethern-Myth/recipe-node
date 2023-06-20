const Recipe = require("../models/recipeModel");

const user = {
	recipes: async (req, res) => {
		try {
			const id = req.params.id;
			const data = await Recipe.find({ userId: id });
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = user;
