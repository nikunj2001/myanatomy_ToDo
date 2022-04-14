const express = require('express');
const app = express();
require("dotenv").config({});
const PORT = process.env.PORT;
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');
const bodyParser = require('body-parser');
const connect = require('./config/db');
const errorMiddleWare = require("./middleware/error");
const logger = require("./config/logger");
connect();
app.use(bodyParser.json());
app.use(cors());
app.use("/", taskRoutes);
app.use("/", authRoutes);
app.use(errorMiddleWare);
if (!module.parent) {
    app.listen(process.env.PORT, () => {
        logger.info(`Server running on Port ${process.env.PORT}`);
        console.log(`Server running on port ${process.env.PORT}!`);
    });
}
module.exports = app;
