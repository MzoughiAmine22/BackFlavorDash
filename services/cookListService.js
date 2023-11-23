const Cooklist = require("../models/Cooklist.js");
const ShoppingListService = require("../services/shoppingListService.js");

class CookListService {
  async createCooklist(userId, recipeId) {
    const newCooklist = new Cooklist({ user: userId, recipes: [recipeId] });
    await newCooklist.save();
    await ShoppingListService.addRecipeIngredientsToShoppingList(
      userId,
      recipeId
    );
    return newCooklist;
  }

  async addRecipeToCooklist(userId, recipeId) {
    const cooklist = await Cooklist.findOne({ user: userId });
    if (!cooklist) {
      return this.createCooklist(userId, recipeId);
    }
    cooklist.recipes.push(recipeId);
    await cooklist.save();
    await ShoppingListService.addRecipeIngredientsToShoppingList(
      userId,
      recipeId
    );
    return cooklist;
  }

  async removeRecipeFromCooklist(userId, recipeId) {
    const cooklist = await Cooklist.findOne({ user: userId });
    if (!cooklist) {
      throw new Error("Cooklist Not Found");
    }
    const recipeIndex = cooklist.recipes.indexOf(recipeId);
    if (recipeIndex === -1) {
      throw new Error("Recipe Not Found");
    }
    cooklist.recipes.splice(recipeIndex, 1);
    await cooklist.save();
    await ShoppingListService.removeRecipeIngredientsFromShoppingList(
      userId,
      recipeId
    );
    return cooklist;
  }
  async getCooklist(userId) {
    const cooklist = await Cooklist.findOne({ user: userId }).populate(
      "recipes"
    );
    if (!cooklist) {
      throw new Error("Cooklist Not Found");
    }
    return cooklist;
  }
  async getAll() {
    const cooklists = await Cooklist.find().populate("recipes");
    return cooklists;
  }
}

module.exports = CookListService;
