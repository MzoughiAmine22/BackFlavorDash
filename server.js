const express = require("express");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
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

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000", // Corrected the URL, added ':' before the port number
      },
    ],
  },
  apis: ["./controllers/*.js"], // Make sure this path is correct and the files contain Swagger definitions
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
