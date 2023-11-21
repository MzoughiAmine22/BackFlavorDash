const User = require("../models/User.js");
const bycrypt = require("bcrypt");
class UserService{
    async registerUser(user){
            const registerUser = new User(user);
            return await registerUser.save();
    }
    async loginUser(email,password){
        const loggeduser = await User.findOne({email:email});
        if(loggeduser)
        {
            const ValidPass = await bycrypt.compare(password, loggeduser.password);
            if(ValidPass)
            {
                return await loggeduser;
            }
            else
            {
                throw new Error("Invalid Credentials");
            }
            
        }
        else
        {
            throw new Error("User Not Found");
        }
    }
    async getAllUsers(){
        return await User.find();
    }
    async getUserById(userId){
        const user = await User.findById(userId);
        if(user)
        {
            return user;
        }
        else
        {
            throw new Error("User Not Found");
        }  
    }
    async updateUser(userId, updatedUser){
        const user = await User.findById(userId);
        if(user)
        {
            user.name = updatedUser.name || user.name;
            user.age = updatedUser.age || user.age;
            user.phone = updatedUser.phone || user.phone;
            return await user.save();
        }
        else
        {
            throw new Error("User Not Found");
        }
    }
    async changePassword(userId, oldpassword,newpassword)
    {
        const user = await User.findById(userId);
        if(user)
        {
            const ValidPass = await bycrypt.compare(oldpassword, user.password);
            if(ValidPass)
            {
                const salt = await bycrypt.genSalt(10);
                const hashedPassword = await bycrypt.hash(newpassword, salt);
                user.password = hashedPassword;
                return await user.save();
            }
            else
            {
                throw new Error("Invalid Credentials");
            }
        }   
        else
        {
            throw new Error("User Not Found");
        }
    }
    async deleteUser(userId){
        const user = await User.findById(userId);
        if(user)
        {
            return await User.findByIdAndDelete(userId);
        }
        else
        {
            throw new Error("User Not Found");
        }
    }
}

module.exports = new UserService();