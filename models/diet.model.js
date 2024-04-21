const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  ingredient_name: { type: String },
  protein: { type: Number },
  fat: { type: Number },
  carbs: { type: Number },
  calories: { type: Number }
});

const mealSchema = new Schema({
  meal_name: { type: String },
  meal_type: { type: String, enum: ['veg', 'non-veg', 'eggs'] },
  ingredients: { type: [ingredientSchema] },
  total: {
    protein: { type: Number },
    fat: { type: Number },
    carbs: { type: Number },
    calories: { type: Number }
  },
  additional_info: { type: String }
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
