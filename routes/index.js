const express = require("express");
const router = express.Router();

// Auth routes
router.use("/auth", require("./routes/auth.route"));

// Recipe routes
router.use("/recipes", require("./routes/recipe.route"));

module.exports = router;