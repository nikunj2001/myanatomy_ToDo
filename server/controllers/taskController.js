const Tasks = require("../models/Tasks");
const ErrorHandler = require("../utils/errorHandler");
const logger = require("../config/logger");
const  catchAsyncErrors= require("../middleware/catchAsyncErrors");
const postTask=catchAsyncErrors(async(req,res,next)=>{
    const {task,description,status} = req.body;
        // if(task===''){
            // return next(new ErrorHandler("Please Enter a Task", 400));
        // } 
            const taskCreated = await Tasks.create({
                task,description,status
            });
            logger.info(`Task Created with ${taskCreated.task} `)
            return res.status(200).json({msg:"Task Created",taskCreated});
}
);
const getTasks= catchAsyncErrors(async(req,res,next)=>{
        const tasks = await Tasks.find().sort({createdAt:-1}).lean();
        logger.info(`${tasks.length} Tasks Fetched`);
        return res.status(200).json({tasks});
})
const updateTaskDetails=catchAsyncErrors(async(req,res,next)=>{
        const id = req.params.id;
        console.log(req.body);
        const {task,description,status}=req.body;
        // if(req.body.task===""){
            // return next(new ErrorHandler("Please Enter a Task", 400));
        // }
            const oldTask =await Tasks.findById(id);
            if(oldTask===null){
                logger.error(`Task not found with ID - ${id}`);
              return next(new ErrorHandler("Task Not Found with This Id",500));
            }
            oldTask.task=task;
            oldTask.description=description;
            oldTask.status=status;
           await oldTask.save();
            logger.info(`Task Updated with Task ID- ${id} while Updating`);
           return res.status(200).json({msg:"Task Updated"});
        })
const deleteTask=catchAsyncErrors(async(req,res,next)=>{
       const {id} = req.params;
       const resp= await Tasks.findOneAndDelete({_id:id});
       if(!resp){
            logger.error(`Task not found with ID - ${id} while Deleting`);
           return next(new ErrorHandler("Task Not Found with This Id",500));
       }
       logger.info(`Task DELETED with  ID- ${id}`);
       return res.status(200).json({msg:"Task Deleted"});
})
// module.exports.getStatusTask=async(req,res,next)=>{
//     try {
//         const tasks = await Tasks.find({status:req.query.status}).sort({createdAt:-1});
//         res.status(200).json({msg:"data found",tasks});
//         }
//      catch (error) {
//         return next(new ErrorHandler(error.message, 500));
//     }
// }
module.exports={deleteTask,updateTaskDetails,getTasks,postTask}