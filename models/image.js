
const mongoose = require('mongoose');

const imageShema = new mongoose.Schema({
    user: {
        type:String,
        unique:true
    },
    images:[{
        name: String,
        img: {
            data: Buffer,
            contentType: String
        },
        _id: false
    }]
})

const Image = mongoose.model('Image', imageShema);

module.exports = Image;