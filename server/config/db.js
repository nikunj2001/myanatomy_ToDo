const mongoose  = require('mongoose');
const logger = require("../config/logger");
const connect = ()=>{
    const my_db="mongodb://0.0.0.0:27017/Myanatomy_ToDo";
    mongoose.connect(my_db);
    const db=mongoose.connection;
    db.on('error',(err)=>{
        logger.error("Error occured while connecting to DB")
        console.log(err.message);
    }
    );
    db.once('open',()=>{
        logger.info("DB Connected");
        console.log("DB connected....");
    });
}
module.exports = connect;