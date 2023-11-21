const Jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User.js");
const protectUser = asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try{
            token = req.headers.authorization.split(" ")[1];
            const decrypt = Jwt.verify(token, "FlavorDashSecretKey");
            req.user = await User.findById(decrypt._id).select("-password");
            next();
        }
        catch(error)
        {
            console.log(error);
            res.status(401).json({msg : "Sorry not authorized Login or Register !"});
        }
    }
    if(!token)
    {
        res.status(401).json({msg : "Sorry not authorized Login or Register !"});
    }
})

module.exports=protectUser;