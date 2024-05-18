const express = require("express");
const isAuthenticated = require("../middleware/auth.js")
const router = express.Router();
const image = require("../models/image.js");
const singleUpload = require("../middleware/singleUpload.js")
const User = require("../models/user.model.js");
const Image = require("../models/image.js");

router.post('/addUser',async(req,res)=>{
    console.log("REQ.BODY RECEIVED IS", req.body);
    const user = new User(req.body);
    await user.save();

    res.json({
        success:true,
        message:"user data is saved"
    })

});

router.post('/uploadpic', async (req, res) => {
    try {
        const userId = req.body.email; 
        let image;
            // Use singleUpload middleware to handle file upload
            singleUpload(req, res, async (err) => {
              if (err) {
                return res.status(400).json({ message: err.message });
              }
              const { originalname, buffer } = req.file || {};
                if (originalname && buffer) {
                    image = {
                    imageName: originalname,
                    imageData: buffer
                    };
                }
            })
            
        const user = await User.findOne({email:userId});
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User not found"
            });
        }
        const userImage=await Image.findOne({user:userId})
        if(userImage){
            userImage.images.push(image);
        } else {
            await Image.create({user:userId, images:image});
        }
        await userImage.save();

        res.json({
            success: true,
            message: "User data is saved"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
router.post('/addUserDiet', async (req, res) => {
    console.log(req.body);
    try {
        let {diet} = req.body;
        const userId = req.body.email; 

        const user = await User.findOneAndUpdate({email:userId}, {recommendedDiet:diet});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // diet={id:user.recommendedDiet.length+1,...diet}
        // user.recommendedDiet.push(diet);
        await user.save();

        res.json({
            success: true,
            message: "User data is saved"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


router.post('/getUserDiet', async (req, res) => {
    try {
        const userId = req.body.email; 

        const user = await User.findOne({email:userId});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // const index = user.recommendedDiet.indexOf({id:diet.id})
        // user.recommendedDiet.splice(index,1);
        await user.save();

        res.json({
            success: true,
            message: "User data is saved",
            data:user.recommendedDiet
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


router.get('/allUser' , async(req,res)=>{
        const allUser = await User.find({isAdmin: false}).exec();
        res.json({
            success: true,
            data:allUser
        })
})

module.exports = router;