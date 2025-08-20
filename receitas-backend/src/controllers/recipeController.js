const Recipe = require('../models/Recipe');

exports.createRecipe = async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      user: req.user.uid, 
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
    const recipes = await Recipe.find({ user: req.user.uid });
    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.updateRecipe = async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'Receita não encontrada' });
    }

    if (recipe.user.toString() !== req.user.uid) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: { title, ingredients, instructions } },
      { new: true }
    );

    res.json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ msg: 'Receita não encontrada' });
    }

    if (recipe.user.toString() !== req.user.uid) {
      return res.status(401).json({ msg: 'Não autorizado' });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Receita removida com sucesso' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro no servidor');
  }
};