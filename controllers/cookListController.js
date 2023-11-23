const express = require("express");
const cookListRouter = express.Router();
const protectUser = require("../middleware/userAuth.js");
const asyncHandler = require("express-async-handler");
const CookListService = require("../services/cookListService.js");

cookListRouter.post(
  "/:recipeId",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const cooklist = await CookListService.addRecipeToCooklist(
        req.user._id,
        req.params.recipeId
      );
      res.json(cooklist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

cookListRouter.delete(
  "/:recipeId",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const cooklist = await CookListService.removeRecipeFromCooklist(
        req.user._id,
        req.params.recipeId
      );
      res.json(cooklist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

cookListRouter.get(
  "/",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const cooklist = await CookListService.getCooklist(req.user._id);
      res.json(cooklist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

cookListRouter.get(
  "/all",
  asyncHandler(async (req, res) => {
    try {
      const cooklists = await CookListService.getAll();
      res.json(cooklists);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

module.exports = cookListRouter;
