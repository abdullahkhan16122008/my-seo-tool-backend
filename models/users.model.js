const mongoose = require('mongoose');


let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})


let User = mongoose.model('user', userSchema)

module.exports = User;