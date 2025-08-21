const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const firebaseAuthMiddleware = require('../middlewares/firebaseAuthMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    fs.mkdirSync(uploadDir, { recursive: true }); 
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.use(firebaseAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.uid }).populate('category');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', upload.single('recipeImage'), async (req, res) => {
  try {
    const { title, instructions, category } = req.body;
    const ingredients = JSON.parse(req.body.ingredients);

    let imageUrl = null;
    if (req.file) {
      const protocol = req.protocol;
      const host = req.get('host');
      imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      category,
      imageUrl,
      user: req.user.uid,
    });

    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', upload.single('recipeImage'), async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Receita não encontrada' });
    if (recipe.user.toString() !== req.user.uid) {
      return res.status(401).json({ message: 'Não autorizado' });
    }

    const { title, instructions, category } = req.body;
    const ingredients = JSON.parse(req.body.ingredients);

    recipe.title = title;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;
    recipe.category = category;

    if (req.file) {
      const protocol = req.protocol;
      const host = req.get('host');
      recipe.imageUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

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

    if (recipe.imageUrl) {
      const filename = recipe.imageUrl.split('/uploads/')[1];
      const filePath = path.join(__dirname, '..', 'uploads', filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: 'Receita deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;