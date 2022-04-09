class ErrorHandler extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        // captureStackTrace() can return call stack information(custom error handling)
        Error.captureStackTrace(this,this.constructor);
    }
}
module.exports = ErrorHandler;