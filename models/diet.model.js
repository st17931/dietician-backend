const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema([{
    categoryName: { type: String },
    categoryData: { type: Object }
}]);

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
