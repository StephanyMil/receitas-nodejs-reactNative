const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const firebaseAuthMiddleware = require('../middlewares/firebaseAuthMiddleware');

router.use(firebaseAuthMiddleware);

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const category = new Category({
    name: req.body.name
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;