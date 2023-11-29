const Admin = require('../models/Admin.js');
const bycrypt = require("bcrypt");
class AdminService{
    async login(email,password){
        const loggedadmin = await Admin.findOne({email:email});
        if(loggedadmin)
        {
            const validatePass = await bycrypt.compare(password, loggedadmin.password);
            if(validatePass)
            {
                return loggedadmin;
            }
            else
            {
                throw new Error("Invalid Credentials");
            }
        }
        else
        {
            throw new Error("Invalid Credentials");
        }
    }
}
    
module.exports = new AdminService();