const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js")

router.post('/addUser',async(req,res)=>{
    const user = new User(req.body);
    await user.save();

    res.json({
        success:true,
        message:"user data is saved"
    })

});

router.get('/allUser', async(req,res)=>{
        const allUser = await User.find({isAdmin: false}).exec();
        res.json({
            success: true,
            data:allUser
        })
})

module.exports = router;