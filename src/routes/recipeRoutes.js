const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createRecipe, getRecipes } = require('../controllers/recipeController');

router.post('/', auth, createRecipe);
router.get('/', getRecipes);

module.exports = router;