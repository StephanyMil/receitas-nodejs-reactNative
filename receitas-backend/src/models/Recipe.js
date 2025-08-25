const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  quantity: { type: String, required: true },
  unit: { type: String, required: true },
  name: { type: String, required: true },
});

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [IngredientSchema],
  instructions: { type: String, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  },
  user: { type: String, required: true },
});

module.exports = mongoose.model('Recipe', RecipeSchema);