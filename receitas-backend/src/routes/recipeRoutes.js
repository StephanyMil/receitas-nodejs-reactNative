const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const firebaseAuthMiddleware = require('../middlewares/firebaseAuthMiddleware');

router.use(firebaseAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.uid }).populate('category');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, instructions, category, ingredients } = req.body;

    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      category,
      user: req.user.uid,
    });

    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receita não encontrada' });
    if (recipe.user.toString() !== req.user.uid) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { title, instructions, category, ingredients } = req.body;

    recipe.title = title;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.category = category;

    const updatedRecipe = await recipe.save();
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receita não encontrada' });
    if (recipe.user.toString() !== req.user.uid) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Receita deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;