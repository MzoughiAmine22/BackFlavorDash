const ShoppingList = require("../models/ShoppingList.js");

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

  async deleteIngredientFromShoppingList(userId, ingredientId, quantity) {
    const shoppingList = await ShoppingList.findOne({ user: userId });
    if (shoppingList) {
      const ingredientIndex = shoppingList.ingredients.findIndex(
        (ingredient) => ingredient.ingredient.toString() === ingredientId
      );
      if (ingredientIndex !== -1) {
        shoppingList.ingredients[ingredientIndex].quantity -= quantity;
        if (shoppingList.ingredients[ingredientIndex].quantity <= 0) {
          shoppingList.ingredients.splice(ingredientIndex, 1);
        }
        return await shoppingList.save();
      } else {
        throw new Error("Ingredient Not Found");
      }
    } else {
      throw new Error("ShoppingList Not Found");
    }
  }
}

module.exports = new ShoppingListService();
