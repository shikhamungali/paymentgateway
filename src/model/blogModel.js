const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    blog: {
        type: String,
        required: true,
        trim: true
    },
    image:{
        type:[String],
        required: true,
        trim: true
    }
},
    { timestamps: true });

module.exports = mongoose.model('blogs', blogSchema)