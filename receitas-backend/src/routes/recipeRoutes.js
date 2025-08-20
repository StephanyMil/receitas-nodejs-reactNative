const express = require('express');
const router = express.Router();
const firebaseAuthMiddleware = require('../middlewares/firebaseAuthMiddleware');
const { 
  createRecipe, 
  getRecipes,
  updateRecipe,
  deleteRecipe 
} = require('../controllers/recipeController');

router.post('/', firebaseAuthMiddleware, createRecipe);
router.get('/', firebaseAuthMiddleware, getRecipes);

router.put('/:id', firebaseAuthMiddleware, updateRecipe);

router.delete('/:id', firebaseAuthMiddleware, deleteRecipe);

module.exports = router;