const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
		},
		ingredients: {
			type: Array,
			required: true,
		},
		instructions: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		link: {
			type: String,
			required: false,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
