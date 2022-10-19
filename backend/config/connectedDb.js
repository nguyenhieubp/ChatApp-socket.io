const mongoose = require("mongoose");
const connectedDB = async () => {
  try {
    mongoose
      .connect(process.env.DB)
      .then(() => console.log("Connected DB"))
      .catch(() => console.log("Not connected DB"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectedDB;
