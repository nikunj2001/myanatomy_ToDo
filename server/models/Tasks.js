const { model, Schema } = require("mongoose");
const bcrypt = require('bcrypt')
const TaskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    status: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('task', TaskSchema);