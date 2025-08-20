const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      user: req.user.id,
    });
    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('user', ['name']);
    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro no servidor');
  }
};