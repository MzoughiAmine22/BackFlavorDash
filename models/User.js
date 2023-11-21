const mongoose = require("mongoose");

const User = mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    password:{
      type:String,
      required:true,
      validate:{
        validator: function(v) {
          return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
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
            return /\d{3}-\d{3}-\d{4}/.test(v);
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
    
      const emailRegex = /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/;
    
    
      return emailRegex.test(value);
    },
          message: 'Invalid email address'
        }
},

})

module.exports = mongoose.model("Users", User);