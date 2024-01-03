const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "first name is require"],
    },
    // lastname: {
    //     type: String,
    //     required: [true, "last name is require"],
    // },
    email: {
        type: String,
        required: [true, "email is require"],
    },
    password: {
        type: String,
        required: [true, "password is require"],
    },
    address: {
        type:String,
        required: [true, "address is require"],
    },
    // isManager: {
    //     type: Boolean,
    //     default: false,
    // },
    // isEmployee: {
    //     type: Boolean,
    //     default: false,
    // },
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel