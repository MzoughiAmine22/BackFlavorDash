const express = require("express");
const recipeController = express.Router();
const asyncHandler = require("express-async-handler");
const Recipe = require("../models/Recipe.js");
const Ingredient = require("../models/Ingredient.js");
const recipeService = require("../services/recipeService.js");

recipeController.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const recipes = await recipeService.getAllRecipes();
      res.status(201).json(recipes);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

recipeController.get(
  "/getById/:id",
  asyncHandler(async (req, res) => {
    try {
      const recipeId = req.params.id;
      const recipe = await recipeService.getRecipeById(recipeId);

      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ msg: "Recipe Not Found" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  })
);

recipeController.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { name, ingredients, instructions, image, mealType } = req.body;
      const recipeBody = {
        name,
        ingredients,
        instructions,
        mealType,
        image,
      };
      const newRecipe = await recipeService.createRecipe(recipeBody);
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

recipeController.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const recipeId = req.params.id;
      const deletedRecipe = await recipeService.deleteRecipe(recipeId);
      res.status(201).json(deletedRecipe);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

recipeController.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const recipeId = req.params.id;
      const { name, ingredients, steps, image } = req.body;
      const updatedRecipe = {
        name,
        ingredients,
        steps,
        image,
      };
      const recipe = await recipeService.updateRecipe(recipeId, updatedRecipe);
      res.status(201).json(recipe);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

recipeController.get(
  "/q/",
  asyncHandler(async (req, res) => {
    const { name, ingredientName, maxSteps, mealType } = req.query;
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    if (ingredientName) {
      const ingredient = await Ingredient.findOne({ name: ingredientName });
      if (ingredient) {
        query["ingredients.ingredient"] = ingredient._id;
      }
    }
    if (maxSteps) {
      query["instructions.step"] = { $lte: maxSteps };
    }
    if (mealType) {
      query.mealType = mealType;
    }
    const recipes = await Recipe.find(query).populate("ingredients.ingredient");
    res.json(recipes);
  })
);

module.exports = recipeController;
