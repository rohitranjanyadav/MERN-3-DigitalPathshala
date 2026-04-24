const express = require("express");

const app = express();

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
