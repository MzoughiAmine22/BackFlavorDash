
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mealType:{
    type:String,
    required:true,
    enum:{
      values: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      message: '{VALUE} is not supported'
    }
  },
  image:{
    type: String,
    required: true
  },
  ingredients: [{
    ingredient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  }],
  instructions: [{
    step:{
        type: Number,
        required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
