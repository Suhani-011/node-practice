
const Recipe = require("../models/Recipe");

// 1. CREATE RECIPE
const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, image } = req.body;

        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            image,
            user: req.user._id
        });

        res.status(201).json({
            message: "Recipe created successfully",
            recipe
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 2. GET ALL RECIPES
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
            .populate("user", "name email");

        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 3. GET SINGLE RECIPE
const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 4. UPDATE RECIPE
const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        if (recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to update this recipe"
            });
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );

        res.status(200).json({
            message: "Recipe updated successfully",
            recipe: updatedRecipe
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 5. DELETE RECIPE
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        if (recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to delete this recipe"
            });
        }

        await Recipe.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Recipe deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe
};
