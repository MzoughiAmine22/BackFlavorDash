const express = require("express");
const router = express.Router();
const ShoppingListService = require("../services/shoppingListService.js");
const protectUser = require("../middleware/userAuth.js");
const asyncHandler = require("express-async-handler");

router.post(
  "/",
  protectUser,
  asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingListService.createShoppingList(req.body);
    res.json(shoppingList);
  })
);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const shoppingLists = await ShoppingListService.getAllShoppingLists();
    res.json(shoppingLists);
  })
);

router.get(
  "/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const shoppingList = await ShoppingListService.getShoppingListById(
        req.params.id
      );
      if (shoppingList.user === req.user._id) {
        res.json(shoppingList);
      } else {
        res.status(401).json({ msg: "ShoppingList Doesnt Belong to user " });
      }
    } catch (error) {
      res.status(401).json({ msg: "ShoppingList Not Found" });
    }
  })
);

router.get(
  "/user/:userId",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const shoppingList = await ShoppingListService.getShoppingListByUserId(
        req.params.userId
      );
      res.json(shoppingList);
    } catch (error) {
      res.status(401).json({ msg: "ShoppingList Not Found" });
    }
  })
);

router.delete(
  "/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingListService.deleteShoppingList(
      req.params.id
    );
    res.json(shoppingList);
  })
);

router.put(
  "/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    const shoppingList = await ShoppingListService.updateShoppingList(
      req.params.id,
      req.body
    );
    res.json(shoppingList);
  })
);

router.delete(
  "/:userId/:ingredientId/:quantity",
  protectUser,
  asyncHandler(async (req, res) => {
    try {
      const shoppingList =
        await ShoppingListService.deleteIngredientFromShoppingList(
          req.params.userId,
          req.params.ingredientId,
          req.params.quantity
        );
      res.json(shoppingList);
    } catch (error) {
      res.status(401).json({ msg: "ShoppingList Not Found" });
    }
  })
);

module.exports = router;
