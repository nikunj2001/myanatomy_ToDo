
const express = require('express');
const router = express.Router();
const { createUser, loginUser, userLogout, deleteUser } = require('../controllers/authController.js');
const { loginValiations, registerValidations } = require("../utils/validations")
const auth = require("../utils/auth.js")
router.post("/registerUser", registerValidations, createUser);
router.post("/loginUser", loginValiations, loginUser);
router.get("/logout", auth, userLogout);
router.post("/deleteUser", auth, deleteUser);
module.exports = router;