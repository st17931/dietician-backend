const mongoose = require("mongoose");
const app = require("./app.js")


async function connectDb(){
    await mongoose.connect("mongodb+srv://st17931:St17931@cluster0.qtv4gie.mongodb.net/dieticianDb?retryWrites=true&w=majority&appName=Cluster0");
    app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
  })
}

connectDb().catch((e)=> console.log("Error in connecting db:--", e.message))