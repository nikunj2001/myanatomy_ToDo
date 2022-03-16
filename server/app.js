const express = require('express');
const app = express();
const PORT = 5000;
const taskRoutes = require("./routes/taskRoutes")
const bodyParser = require('body-parser');
const connect = require('./config/db');
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
connect();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/",taskRoutes);




module.exports=app.listen(PORT,()=>{
    console.log(`Listening on ${PORT} `);
})