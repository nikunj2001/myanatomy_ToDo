module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode ||500;
    err.message = err.message || "Internal Server Error";
    console.log(err.message,err.statusCode);
    res.status(err.statusCode).json({message:err.message});
}