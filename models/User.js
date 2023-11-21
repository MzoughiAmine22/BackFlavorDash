const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

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
    age:{
      type:Number,
        required:false,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            return /\d{2}-\d{3}-\d{3}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
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
},

});

const User = mongoose.model('User', userSchema);
module.exports = User;