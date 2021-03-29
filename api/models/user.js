const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creationDate: {type: Date},
    lastUpdateDate: { type: Date, default: Date.now },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    userName: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, required: true },
    collectedPoints: { type: Number, required: true, default: 0}
})



module.exports = mongoose.model('User', userSchema);