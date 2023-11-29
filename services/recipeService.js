const Recipe = require("../models/Recipe.js");
class RecipeService {
  async createRecipe(recipe) {
    const newRecipe = new Recipe(recipe);
    return await newRecipe.save();
  }
  async getAllRecipes() {
    return await Recipe.find().populate("ingredients.ingredient");
  }
  async getRecipeById(recipeId) {
    const recipe = await Recipe.findById(recipeId).populate(
      "ingredients.ingredient"
    );
    if (recipe) {
      return recipe;
    } else {
      throw new Error("Recipe Not Found");
    }
  }
  async deleteRecipe(recipeId) {
    const recipe = await Recipe.findById(recipeId);
    if (recipe) {
      return await Recipe.findByIdAndDelete(recipeId);
    } else {
      throw new Error("Recipe Not Found");
    }
  }
  async updateRecipe(recipeId, updatedRecipe) {
    const recipe = await Recipe.findById(recipeId);
    if (recipe) {
      recipe.name = updatedRecipe.name || recipe.name;
      recipe.ingredients = updatedRecipe.ingredients || recipe.ingredients;
      recipe.mealType = updatedRecipe.mealType || recipe.mealType;
      recipe.instructions = updatedRecipe.instructions || recipe.instructions;
      recipe.image = updatedRecipe.image || recipe.image;
      return await recipe.save();
    } else {
      throw new Error("Recipe Not Found");
    }
  }
}

module.exports = new RecipeService();
