const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema([{
    categoryName: { type: String },
    nutritionData: { type: Object },
    warmupData: { type: Object },
    cardioData: { type: Object },
    workoutData: { type: Object },
    absData: { type: Object },
    supplementData: { type: Object },
    groceryData: { type: Object },
    instructionsData: { type: Object }
}]);

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
