const ingredient = require("../services/ingredientService.js");
const ingredientController = require("express").Router();
const Ingredient = require("../models/Ingredient.js");
const asyncHandler = require("express-async-handler");

ingredientController.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const ingredients = await ingredient.getAllIngredients();
      res.status(201).json(ingredients);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

ingredientController.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const ingredientId = req.params.id;
      const ingredient = await ingredient.getIngredientById(ingredientId);
      if (ingredient) {
        res.status(201).json(ingredient);
      } else {
        res.status(401).json({ msg: "Ingredient Not Found" });
      }
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

ingredientController.post(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { name, image } = req.body;
      const ingredientBody = {
        name,

        image,
      };
      const newIngredient = await ingredient.createIngredient(ingredientBody);
      res.status(201).json(newIngredient);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

ingredientController.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const ingredientId = req.params.id;
      const deletedIngredient = await ingredient.deleteIngredient(ingredientId);
      if (deletedIngredient) {
        res.status(201).json(deletedIngredient);
      } else {
        res.status(401).json({ msg: "Ingredient Not Found" });
      }
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

//add an array post
ingredientController.post(
  "/array",
  asyncHandler(async (req, res) => {
    try {
      const ingredients = req.body;
      const newIngredients = await Ingredient.insertMany(ingredients);
      res.status(201).json(newIngredients);
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  })
);

module.exports = ingredientController;
