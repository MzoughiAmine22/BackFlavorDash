const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User field is required"],
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
});

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;
