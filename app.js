const express = require("express");
const cors = require("cors");
const app = express();
const user = require("./routes/use-routes.js")
const UserModel = require("./models/user.model.js")
const jwt = require("jsonwebtoken");
require('dotenv').config();



app.use(cors())
app.use(express.json());

app.use('/users', user);

app.post('/login', async (req, res) => {
    //Authenticating user
    const response = await UserModel.find(req.body).exec();

    //NOw generating the jwt for the user with the email and isAdmin as payload

    const payload = response.length!=0 && {email:response[0].email, isAdmin:response[0].isAdmin};

    const token = response.length!=0 && jwt.sign(payload, process.env.JWT_SECRET_ACCESS_KEY);

    res.cookie('jwt',token,{
        httpOnly: true,
        sameSite: 'strict'
    })
    

    if (response.length != 0) {
        res.json({
            success: true,
            message:"User login successfull",
            isAdmin:response[0].isAdmin
        })
    }else{
        res.json({
            success:false,
            message:"Pls register yourself you are not registered with us yet"
        })
    }



})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//   })
module.exports = app;
