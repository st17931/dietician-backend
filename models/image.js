
const mongoose = require('mongoose');

const imageShema = new mongoose.Schema({
    user: {
        type:String,
        unique:true
    },
    name: String,
    images: {
        data: Buffer,
        contentType: String
    }
})

const Image = mongoose.model('Image', imageShema);

module.exports = Image;