const asyncHandler = require("express-async-handler");
const express = require("express");
const adminService = require("../services/adminService.js");
const adminController = express.Router();
const jwt = require('../config/token.js');

adminController.post("/login",asyncHandler(async (req, res) => {
    try{
        const { email, password } = req.body;
        const admin = await adminService.login(email, password);
        res.status(201).json({admin, token:jwt(admin)});
    }
    catch(error)
    {
        res.status(404).json({msg : error.message});
    }
}));

module.exports = adminController;