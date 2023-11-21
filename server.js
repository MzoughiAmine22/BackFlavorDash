const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();
const connect = require("./mongoconfig/connect.js");
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

connect();
app.get("/",(req,res)=>{
    res.send("<center><h1>ooooo, Welcome To FlavorDash!</h1></center>");
})

const user = require("./models/User.js");

const server = app.listen(
    PORT,
    console.log(`Server running at  http://localhost:${PORT}`)
);