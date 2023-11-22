const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();
const connect = require("./config/connect.js");
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

connect();
app.get("/", (req, res) => {
  res.send("<center><h1>ooooo, Welcome To FlavorDash!</h1></center>");
});

const server = app.listen(
  PORT,
  console.log(`Server running at  http://localhost:${PORT}`)
);

const userController = require("./controllers/userController.js");
const ingredientController = require("./controllers/ingredientController.js");
const adminController = require("./controllers/adminController.js");
const recipeController = require("./controllers/recipeController.js");
const ShoppingListController = require("./controllers/shoppingListController.js");
const cookListController = require("./controllers/cookListController.js");
app.use("/api/users", userController);
app.use("/api/ingredients", ingredientController);
app.use("/api/admins", adminController);
app.use("/api/recipes", recipeController);
app.use("/api/shopping", ShoppingListController);
app.use("/api/cooklist", cookListController);
