const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }).
    pre('save', async function () {
        const password = this.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        this.password = hash;
    })

module.exports = model('user', UserSchema);
