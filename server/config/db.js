const mongoose = require('mongoose');
const connect =()=>{
    const my_db="mongodb://0.0.0.0:27017/Myanatomy_ToDo";
    mongoose.connect(my_db,{ autoIndex: false }).
    then(()=>{console.log();})
    const db = mongoose.connection;
    db.on('error',console.error.bind(console,"Connection error"));
    db.once('open',()=>{
        console.log("DB connected.......");
    });
}
module.exports = connect;