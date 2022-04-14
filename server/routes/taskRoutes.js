const express = require('express');
const { checkSchema } = require('express-validator');
const router = express.Router();
const auth = require('../utils/auth');
const { taskValidations } = require("../utils/validations")

const { postTask, getTasks, updateTaskDetails, deleteTask, } = require("../controllers/taskController");


router.post("/uploadTask", auth, taskValidations, postTask);
router.get("/getTasks/:id", auth, getTasks);
router.put("/updateTaskDetails/:id", auth, taskValidations, updateTaskDetails);
router.delete("/deleteTask/:id", auth, deleteTask);
module.exports = router;