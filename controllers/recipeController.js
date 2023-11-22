const express = require("express");
const recipeController = express.Router();
const asyncHandler = require("express-async-handler");
const recipeService = require("../services/recipeService.js");

recipeController.get("/", asyncHandler(async (req, res) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.status(201).json(recipes);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}))

recipeController.get("/:id", asyncHandler(async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeService.getRecipeById(recipeId);
        if (recipe) {
            res.status(201).json(recipe);
        } else {
            res.status(401).json({ msg: "Recipe Not Found" });
        }
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}))

recipeController.post("/", asyncHandler(async (req, res) => {
    try {
        const { name, ingredients, steps, image } = req.body;
        const recipeBody = {
            name,
            ingredients,
            steps,
            image
        }
        const newRecipe = await recipeService.createRecipe(recipeBody);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}))

recipeController.delete("/:id", asyncHandler(async (req, res) => {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await recipeService.deleteRecipe(recipeId);
        res.status(201).json(deletedRecipe);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}))

recipeController.put("/:id", asyncHandler(async (req, res) => {
    try {
        const recipeId = req.params.id;
        const { name, ingredients, steps, image } = req.body;
        const updatedRecipe = {
            name,
            ingredients,
            steps,
            image
        }
        const recipe = await recipeService.updateRecipe(recipeId, updatedRecipe);
        res.status(201).json(recipe);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}))

module.exports = recipeController;