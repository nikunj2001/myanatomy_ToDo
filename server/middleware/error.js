const logger = require("../config/logger");
const ErrorHandler = require("../utils/errorHandler");
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500;
    err.message = err.message || "Internal Server Error";
// Wrong mongoId Error
if(err.name=="CastError"){
    const message =`Resource Not Found Invalid ${err.path}`
    logger.error(message,400)
    err=new ErrorHandler(message,400);
} 
    console.log(err.message,err.statusCode);
    logger.error(err.message,err.statusCode);
    res.status(err.statusCode).json({message:err.message});
}