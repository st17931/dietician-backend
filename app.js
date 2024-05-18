const express = require("express");
const cors = require("cors");
const app = express();
const user = require("./routes/use-routes.js")
const dietRoute = require("./routes/diet-routes.js")
const verifyLogin =require("./routes/verifyLogin.js")

const cookieParser = require('cookie-parser');

app.use(cookieParser('thisissomesecret'));

app.use(cors())
app.use(express.json());

app.use('/diet', dietRoute);

app.use('/users', user);

app.post('/login', verifyLogin)


module.exports = app;
