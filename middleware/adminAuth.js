const Jwt=require('jsonwebtoken');
const Admin = require('../models/Admin.js');
const asyncHandler = require('express-async-handler');
const protectAdmin= asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try{
            token=req.headers.authorization.split(" ")[1];
            const decrypt=Jwt.verify(token,"FlavorDashSecretKey");
            req.admin=await Admin.findById(decrypt._id).select("-password");
            next();
        }
        catch(error)
        {
            console.log(error);
            res.status(401).json({msg:"Sorry not authorized Login or Register !"});
        }
    }
    if(!token)
    {
        res.status(401).json({msg:"Sorry not authorized Login or Register !"});
    }

})

module.exports=protectAdmin;