const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        validate:{
          validator: function(v) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(v);
          },
          message: props => `${props.value} is not a valid password!`
        }
      },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (value) => {
    
      const emailRegex = /\S+@\S+\.\S+/;
    
    
      return emailRegex.test(value);
    },
          message: 'Invalid email address'
        }
}
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;