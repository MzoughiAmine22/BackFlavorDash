const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
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
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
