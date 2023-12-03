const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [100, "Name must be at most 100 characters long"],
  },
  mealType: {
    type: String,
    required: [true, "Meal type field is required"],
    enum: {
      values: [
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Dessert",
        "Vegetarian",
        "Miscellaneous",
        "Seafood",
      ],
      message: (props) => `${props.value} is not a valid meal type`,
    },
  },
  image: {
    type: String,
    required: [true, "Image field is required"],
    trim: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL`,
    },
  },
  ingredients: [
    {
      ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        required: [true, "Ingredient field is required"],
      },
      mesure: {
        type: String,
        required: [true, "Measure field is required"],
        trim: true,
      },
    },
  ],
  instructions: [
    {
      step: {
        type: Number,
        required: [true, "Step field is required"],
        min: [1, "Step must be at least 1"],
      },
      description: {
        type: String,
        required: [true, "Description field is required"],
        trim: true,
        maxlength: [5000, "Description must be at most 5000 characters long"],
      },
    },
  ],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
