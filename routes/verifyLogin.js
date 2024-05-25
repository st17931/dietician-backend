const  jwt  = require("jsonwebtoken");
const UserModel = require("../models/user.model.js");

const verifyLogin=async (req, res) => {
    //Authenticating user
    const response = await UserModel.find(req.body).exec();
    //NOw generating the jwt for the user with the email and isAdmin as payload
    const payload = response.length!=0 && {name: response[0].firstName +" "+response[0].lastName, email:response[0].email, isAdmin:response[0].isAdmin, isUser:response[0].isUser};
    
    const token = response.length!=0 && jwt.sign(payload, process.env.JWT_SECRET_ACCESS_KEY);

    if (response.length != 0) {
        res.json({
            success: true,
            message:"User login successfull",
            token:token
        })
    }else{
        res.json({
            success:false,
            message:"Pls register yourself you are not registered with us yet"
        })
    }
}

module.exports=verifyLogin;