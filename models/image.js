
const mongoose = require('mongoose');

const imageShema = new mongoose.Schema({
    user: {
        type:String,
        unique:true
    },
    images:[{
    imageName: String,
    imageData: String
}]
})

const Image = mongoose.model('Image', imageShema);

module.exports = Image;