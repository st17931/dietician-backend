const express = require("express");
const router = express.Router();
const Meal = require("../models/diet.model.js")

router.post('/addMeal',async(req,res)=>{
    const meal = new Meal(req.body);
    await meal.save();

    res.json({
        success:true,
        message:"meal data is saved"
    })

});

router.get('/getMeal', async(req,res)=>{
    const {meal_type}=req.query;
        const allMeal = await Meal.find({meal_type: meal_type}).exec();
        res.json({
            success: true,
            data:allMeal
        })
})

module.exports = router;