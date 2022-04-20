const Tasks = require("../models/Tasks");
const ErrorHandler = require("../utils/errorHandler");
const { validationResult } = require('express-validator')
const logger = require("../config/logger");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Users = require("../models/Users");


const postTask = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { task, description, status, userId } = req.body;
    const taskCreated = await Tasks.create({
        task, description, status, userId: userId
    });
    logger.info(`Task Created with ${taskCreated.task} `);
    return res.status(200).json({ msg: "Task Created", taskCreated });
}
);

const getTasks = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const userExists = await Users.findById(id);
    if (!userExists) {
        return res.status(400).json({ msg: "User Not Found with this UserID" });
    }
    if (id !== req.user._id) {
        return res.status(404).json({ msg: "Cannot Fetch Tasks.Id Not Matched." })
    }
    const tasks = await Tasks.find({ userId: id }).sort({ createdAt: -1 }).lean();
    logger.info(`${tasks.length} Tasks Fetched`);
    return res.status(200).json({ tasks });
})

const updateTaskDetails = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.json({ errors: errors.array() });
    }
    const oldTask = await Tasks.findByIdAndUpdate(id, { $set: req.body });
    if (oldTask === null) {
        logger.error(`Task not found with ID - ${id}`);
        return next(new ErrorHandler("Task Not Found with This Id", 500));
    }
    logger.info(`Task Updated with Task ID- ${id} while Updating`);
    return res.status(200).json({ msg: "Task Updated" });
})

const deleteTask = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req);
    const { id } = req.params;
    const resp = await Tasks.findOneAndDelete({ _id: id });
    if (!resp) {
        logger.error(`Task not found with ID - ${id} while Deleting`);
        return next(new ErrorHandler("Task Not Found with This Id", 500));
    }
    logger.info(`Task DELETED with  ID- ${id}`);
    return res.status(200).json({ msg: "Task Deleted" });
})

module.exports = { deleteTask, updateTaskDetails, getTasks, postTask }
