const mongoose = require('mongoose')
let roles={
    USER:"user",
    ADMIN:"admin"
}

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    roles:{
      type:[String],
      enum:Object.values(roles),
      default:"user"
    }
    
},
    { timestamps: true });

let userData = mongoose.model('User', userSchema)
module.exports={roles,userData}