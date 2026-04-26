const express = require("express");
const connectToDatabase = require("./database");
const app = express();

connectToDatabase();

app.get("/", (req, res) => {
  res.json({
    message: "Home page",
  });
});

app.get("/about", (req, res) => {
  res.json({
    message: "About page",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
