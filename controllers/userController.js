const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const userService = require('../services/userService.js');
const userController = require('express').Router();
const bycrypt = require('bcrypt');
const jwt = require('../config/token.js');
const protectUser = require('../middleware/userAuth.js');
userController.get('/', asyncHandler( async ( req, res ) => {
    try{
        const users = await userService.getAllUsers();
        res.status(201).json( users );
    }
    catch(error)
    {
        res.status(404).json({msg : error.message});
    }

}))

userController.post('/register', asyncHandler( async ( req, res ) => {
    try{
        const { name, age, email, password,phone } = req.body;
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);
        const userbody = {
            name,
            age,
            email,
            password : hashedPassword,
            phone
        }
        const user = await userService.registerUser(userbody);
        res.status(201).json( user );
    }
    catch(error)
    {
        res.status(404).json({msg : error.message});    }
}))

userController.get('/:id', asyncHandler( async ( req, res ) => {
    try{
        const user = await userService.getUserById(req.params.id);
        if(user)
        {
            res.status(201).json( user );
        }
        else
        {
            res.status(401).json({msg : "User Not Found"});
        }
    }
    catch(error)
    {
        res.send.json({msg : error.message});    }
}))

userController.post('/login', protectUser,asyncHandler( async ( req, res ) => {
    try{
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        if(user)
        {
            res.status(201).json({user:user,token:jwt(user)});
        
        }
        else
        {
            res.status(401).json({msg : "Wrong Credentials"});
        }
    }
    catch(error)
    {
        res.status(404).json({msg : error.message});
    }
}))

userController.put('/:id',protectUser, asyncHandler( async ( req, res ) => {
    try{
        const user = await userService.updateUser(req.params.id, req.body);
        if(user)
        {
            res.status(201).json(user);
        }
        else
        {
            res.status(401).json({msg : "User Not Found"});
        }
    }
    catch(error)
    {
        res.status(404).json({msg : error.message});
    }
}))

userController.put('/changepassword/:id',protectUser, asyncHandler( async ( req, res ) => {
    try{
        const { oldpassword, newpassword } = req.body;
        const user = await userService.changePassword(req.params.id, oldpassword, newpassword);
        if(user)
        {
            res.status(201).json(user);
        }
        else
        {
            res.status(401).json({msg : "User Not Found"});
        }
    }
    catch(error)
    {
        res.status(404).json({msg : error.message});
    }
}))

userController.delete('/:id',protectUser, asyncHandler( async ( req, res ) => {
    try{
        const user = await userService.deleteUser(req.params.id);
        if(user)
        {
            res.status(201).json(user);
        }
        else
        {
            res.status(401).json({msg : "User Not Found"});
        }
    }
    catch(error)
    {
        res.status(404).json({msg : error.message});
    }
}))

module.exports = userController;