const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connect = mongoose.connect(
      "mongodb+srv://amine:0000@cluster0.feefllp.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 100000,
      }
    );
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(`Error Connecting to DataBase : ${error}`);
    process.exit(1);
  }
};
module.exports = connectDB;
