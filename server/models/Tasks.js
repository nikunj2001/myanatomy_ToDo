const {model,Schema} = require("mongoose");
const TaskSchema = new Schema({
    task:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:null
    },
    status:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});
module.exports = model('task',TaskSchema);