const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: false
    },
    category:{
        type:String,
        required:false,
    },
    price:{
        type:Number,
        required:true,
    },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
