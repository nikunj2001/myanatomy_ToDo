const Tasks = require("../models/Tasks");

module.exports.postTask=async(req,res)=>{
    console.log(req.body);
    const {task,description,status} = req.body;
    try {
        if(task===''){
            return res.status(400).json({msg:"Title is required"});
        } 
            const task_todo = await Tasks.create({
                _id:new Date(),task,description,status
            });
            console.log(task);
            return res.status(200).json({msg:"Task Created",task_todo});
    } catch (error) {
            console.log(error);        
    }
};
module.exports.getTasks=async(req,res)=>{
    try {
        const tasks = await Tasks.find();
        const data=tasks.reverse();
        return res.status(200).json({tasks:data});
    } catch (error) {
        console.log(error);        
    }
}
module.exports.updateTaskDetails=async(req,res)=>{
    try {
        const id = req.params.id;
         Tasks.findByIdAndUpdate(id,{$set:req.body},{new:true}, function(err, result){
        if(err){
            console.log(err);
        }
        console.log(result);
        res.status(200).json({msg:"Task Updated"});
    });
        // return res.status(200).json({task});
    } catch (error) {
        console.log(error);        
    }
}
module.exports.deleteTask=async(req,res)=>{
    try {
        Tasks.findByIdAndDelete(req.params.id,(err,result)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(result);
            res.status(200).json({msg:"Task Deleted"});
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports.getStatusTask=async(req,res)=>{
    try {
        console.log(req.query.status);
        const tasks = await Tasks.find({status:req.query.status});
        const data = tasks.reverse()
        res.status(200).json({msg:"data found",tasks:data});
        }
     catch (error) {
        console.log(error);
    }
}