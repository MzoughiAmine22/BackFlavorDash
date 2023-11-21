const Ingredient = require('../models/Ingredient.js');

class IngredientService{
    async createIngredient(ingredient){
        const newIngredient = new Ingredient(ingredient);
        return await newIngredient.save();
    }
    async getAllIngredients(){
        return await Ingredient.find();
    }
    async getIngredientById(ingredientId){
        const ingredient = await Ingredient.findById(ingredientId);
        if(ingredient)
        {
            return ingredient;
        }
        else
        {
            throw new Error("Ingredient Not Found");
        }  
    }
    async deleteIngredient(ingredientId){
        const ingredient = await Ingredient.findById(ingredientId);
        if(ingredient)
        {
            return await Ingredient.findByIdAndDelete(ingredientId);
        }
        else
        {
            throw new Error("Ingredient Not Found");
        }
    }
}
module.exports = new IngredientService();