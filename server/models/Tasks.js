const {model,Schema} = require("mongoose");


const TaskSchema = new Schema({
    _id:{
        type:String,
        required:true
    },
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
    }
});

module.exports = model('task',TaskSchema);