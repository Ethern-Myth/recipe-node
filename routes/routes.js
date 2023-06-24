const express = require("express");
const router = express.Router();

const home = require("../controllers/homeController");
const recipe = require("../controllers/recipeController");
const user = require("../controllers/userController");
const about = require("../controllers/aboutController");

const { ensureToken } = require("../lib/headerToken");

// HOME ROUTES
router.post("/login", home.login);

router.post("/register", home.register);

// RECIPE ROUTES
router.get("/recipe", recipe.recipes);

router.get("/recipe/:id", recipe.recipe);

router.post("/recipe", ensureToken, recipe.add);

router.put("/recipe/:id", ensureToken, recipe.update);

router.put(
	"/recipe/upload/:id",
	ensureToken,
	recipe.uploadImage,
	recipe.uploadUpdate
);

router.delete("/recipe/:id", ensureToken, recipe.remove);

// USER RECIPE ROUTES
router.get("/recipe/user/:id", ensureToken, user.recipes);

// GET APIs DOCUMENTATION
router.get("/", about.docs);

module.exports = router;
