
const express = require("express");
const router = express.Router();

const {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe
} = require("../controllers/recipe.controller");

const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, createRecipe);
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.put("/:id", authenticate, updateRecipe);
router.delete("/:id", authenticate, deleteRecipe);

module.exports = router;
