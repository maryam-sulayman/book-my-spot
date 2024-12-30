const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { 
        type: String, 
        enum: ['driver', 'parking space owner', 'admin'], 
        default: 'driver' 
    },
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel;