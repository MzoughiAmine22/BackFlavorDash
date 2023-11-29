const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const cookieparser = require("cookie-parser");
const swaggerDocument = require("./swagger_output.json");
const PORT = process.env.PORT || 5000;
const app = express();
const connect = require("./config/connect.js");
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(cookieparser());

app.use(express.urlencoded());
app.use(express.json());

connect();
app.get("/", (req, res) => {
  res.send("<center><h1>ooooo, Welcome To FlavorDash!</h1></center>");
});

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
const cookieParser = require("cookie-parser");
app.use("/api/users", userController);
app.use("/api/ingredients", ingredientController);
app.use("/api/admins", adminController);
app.use("/api/recipes", recipeController);
app.use("/api/shopping", ShoppingListController);
app.use("/api/cooklist", cookListController);


//const Admin = require("./models/Admin.js");

//const bycrypt = require("bcrypt");

/*async function createAdmin(){
  try{
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash("flavoradmin", salt);
    const admin = new Admin({
      name:"admin",
      email:"adminflavordash@gmail.com",
      password:hashedPassword,
  })
  await admin.save();
}
catch(error){
  console.log(error);
}
}

createAdmin();
*/
// const Recipe = require("./models/Recipe");
// const Ingredient = require("./models/Ingredient");

// async function saveRecipesToDatabase() {
//   try {
//     // let response = await fetch(
//     //   "https://www.themealdb.com/api/json/v1/1/search.php?f=g"
//     // );
//     let response = await fetch(
//       "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
//     );
//     let data = await response.json();

//     for (const meal1 of data.meals) {
//       let response1 = await fetch(
//         "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + meal1.idMeal
//       );
//       let meal = await response1.json();
//       meal = meal.meals[0];
//       console.log(meal);
//       const recipe = new Recipe({
//         name: meal.strMeal,
//         mealType: "Breakfast",
//         image: meal.strMealThumb,
//         ingredients: [],
//         instructions: [],
//       });

//       for (let i = 1; i <= 20; i++) {
//         const ingredientName = meal[`strIngredient${i}`];
//         const ingredientMeasure = meal[`strMeasure${i}`];

//         if (ingredientName && ingredientMeasure) {
//           let ingredient = await Ingredient.findOne({ name: ingredientName });

//           if (!ingredient) {
//             let imageUrl =
//               "https://www.themealdb.com/images/ingredients/" +
//               ingredientName +
//               ".png";

//             ingredient = new Ingredient({
//               name: ingredientName,
//               image: imageUrl,
//             });

//             await ingredient.save();
//           }

//           recipe.ingredients.push({
//             ingredient: ingredient._id,
//             mesure: ingredientMeasure,
//           });
//         }
//       }

//       const instructions = meal.strInstructions.split("\r\n");
//       for (let i = 0; i < instructions.length; i++) {
//         if (instructions[i].trim() !== "") {
//           // Add this line
//           recipe.instructions.push({
//             step: i + 1,
//             description: instructions[i],
//           });
//         }
//       }
//       console.log(recipe);
//       await recipe.save();
//     }

//     console.log("Recipes saved successfully!");
//   } catch (error) {
//     console.error("Error saving recipes:", error);
//   } finally {
//   }
// }
// const axios = require("axios");
// const cheerio = require("cheerio");

// async function fetchGoogleImage(query) {
//   const response = await axios.get(
//     `https://www.google.com/search?q=${query}&tbm=isch`
//   );

//   const $ = cheerio.load(response.data);
//   let imageUrl = "";
//   $("img").each((i, img) => {
//     imageUrl = $(img).attr("src");
//     if (imageUrl.includes("http") || imageUrl.includes("https")) {
//       return false;
//     }
//   });
//   console.log(imageUrl);
//   return imageUrl;
// }

// saveRecipesToDatabase();
