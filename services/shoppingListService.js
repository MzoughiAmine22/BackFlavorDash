const ShoppingList = require("../models/ShoppingList.js");
const Recipe = require("../models/Recipe.js");

class ShoppingListService {
  async createShoppingList(shoppingList) {
    const newShoppingList = new ShoppingList(shoppingList);
    return await newShoppingList.save();
  }
  async getAllShoppingLists() {
    return await ShoppingList.find();
  }
  async getShoppingListById(shoppingListId) {
    const shoppingList = await ShoppingList.findById(shoppingListId);
    if (shoppingList) {
      return shoppingList;
    } else {
      throw new Error("ShoppingList Not Found");
    }
  }
  async getShoppingListByUserId(userId) {
    const shoppingList = await ShoppingList.find({ user: userId });
    if (shoppingList) {
      return shoppingList;
    } else {
      throw new Error("ShoppingList Not Found");
    }
  }
  async deleteShoppingList(shoppingListId) {
    const shoppingList = await ShoppingList.findById(shoppingListId);
    if (shoppingList) {
      return await ShoppingList.findByIdAndDelete(shoppingListId);
    } else {
      throw new Error("ShoppingList Not Found");
    }
  }
  async updateShoppingList(shoppingListId, updatedShoppingList) {
    const shoppingList = await ShoppingList.findById(shoppingListId);
    if (shoppingList) {
      shoppingList.name = updatedShoppingList.name || shoppingList.name;
      shoppingList.ingredients =
        updatedShoppingList.ingredients || shoppingList.ingredients;
      shoppingList.steps = updatedShoppingList.steps || shoppingList.steps;
      shoppingList.image = updatedShoppingList.image || shoppingList.image;
      return await shoppingList.save();
    } else {
      throw new Error("ShoppingList Not Found");
    }
  }

  async deleteIngredientFromShoppingList(userId, ingredientId) {
    const shoppingList = await ShoppingList.findOne({ user: userId });
    if (shoppingList) {
      const ingredientIndex = shoppingList.ingredients.findIndex(
        (ingredient) => ingredient.ingredient.toString() === ingredientId
      );
      if (ingredientIndex !== -1) {
        shoppingList.ingredients.splice(ingredientIndex, 1);
        return await shoppingList.save();
      } else {
        throw new Error("Ingredient Not Found");
      }
    } else {
      throw new Error("ShoppingList Not Found");
    }
  }

  async addRecipeIngredientsToShoppingList(userId, recipeId) {
    const shoppingList = await ShoppingList.findOne({ user: userId });
    const recipe = await Recipe.findById(recipeId);
    if (shoppingList && recipe) {
      recipe.ingredients.forEach((ingredient) => {
        const ingredientIndex = shoppingList.ingredients.findIndex(
          (item) =>
            item.ingredient.toString() === ingredient.ingredient.toString()
        );
        if (ingredientIndex !== -1) {
          shoppingList.ingredients[ingredientIndex].mesure +=
            ", " + ingredient.mesure;
        } else {
          shoppingList.ingredients.push(ingredient);
        }
      });
      return await shoppingList.save();
    } else {
      throw new Error("ShoppingList or Recipe Not Found");
    }
  }

  async removeRecipeIngredientsFromShoppingList(userId, recipeId) {
    const shoppingList = await ShoppingList.findOne({ user: userId });
    const recipe = await Recipe.findById(recipeId);
    if (shoppingList && recipe) {
      recipe.ingredients.forEach((ingredient) => {
        const ingredientIndex = shoppingList.ingredients.findIndex(
          (item) =>
            item.ingredient.toString() === ingredient.ingredient.toString()
        );
        if (ingredientIndex !== -1) {
          shoppingList.ingredients.splice(ingredientIndex, 1);
        }
      });
      return await shoppingList.save();
    } else {
      throw new Error("ShoppingList or Recipe Not Found");
    }
  }
}
module.exports = new ShoppingListService();
