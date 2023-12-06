const asyncHandler = require("express-async-handler");
const express = require("express");
const adminService = require("../services/adminService.js");
const adminController = express.Router();
const jwt = require('../config/token.js');
const Jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const Admin = require("../models/Admin.js");

adminController.post(
    "/login",
    asyncHandler(async (req, res) => {
    try{
        const { email, password } = req.body;
        const admin = await adminService.login(email, password);
        if(admin)
        {
            const token = jwt(admin);
            res.cookie('othertoken',token,{httpOnly:true,maxAge:24*60*60*1000});
            res.status(201).json({admin:admin, othertoken:token});
        }
        else
        {
            res.status(401).json({msg:"Invalid Credentials"});
        }
        res.status(201).json({admin, othertoken:jwt(admin)});
    }
    catch(error)
    {
        res.status(404).json({msg : error.message});
    }
}));

adminController.get(
    "/cookie",
    asyncHandler(async (req,res)=>{
      try{
        const cookie = req.cookies['othertoken'];
        const claims = Jwt.verify(cookie,"FlavorDashSecretKey");
  
        if(!claims)
        {
          res.status(401).json({msg:"Unauthenticed man!"});
        }
        const admin = await Admin.findOne({_id:claims._id});
        console.log(cookie);
        res.status(201).json(
          {admin:admin,
            othertoken:cookie,
            message:"Got Cookie Successfully",
          }
        )
      }
      catch(error)
      {
        res.status(500).json({msg:error.message});
      }
    }));

adminController.get(
    "/logout",
    asyncHandler(async (req,res)=>{
      try{
        res.cookie('othertoken','',{httpOnly:true,maxAge:0});
        res.clearCookie('othertoken','',{httpOnly:true,maxAge:24*60*60*1000});
        res.status(201).json({message:"Logged Out Successfully"});
      }
      catch(error)
      {
        res.status(401).json({messag:error.message});
      }
    }));

module.exports = adminController;