const about = {
	docs: async (req, res) => {
		try {
			res.status(200).json({
				API_Description: "Recipe APIs",
				Info: {
					DOCS: "(GET) /",
					GET_RECIPES: "(GET) /recipe",
					GET_SINGLE_RECIPE: "(GET) e.g /recipe/1",
					ADD_RECIPE: "(POST) /recipe",
					UPDATE_RECIPE: "(PUT) e.g /recipe/id",
					UPLOAD_RECIPE: "(PUT) /recipe/upload/1",
					DELETE_RECIPE: "(DELETE) e.g /recipe/1",
				},
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = about;
