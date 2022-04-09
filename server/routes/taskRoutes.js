const express = require('express');
const router = express.Router();
const { postTask, getTasks, updateTaskDetails, deleteTask } = require("../controllers/taskController");

router.post("/uploadTask",postTask);
router.get("/getTasks", getTasks);
router.put("/updateTaskDetails/:id", updateTaskDetails);
router.delete("/deleteTask/:id", deleteTask);
// router.get("/statusTask", getStatusTask);

module.exports = router;