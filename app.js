require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database");

const app = express();
app.use(express.json())

connectToDatabase();

app.get("/", (req, res) => {
  res.json({
    message: "Home page",
  });
});

app.post("/blog",(req,res)=>{
  console.log(req.body)
  res.status(200).json({
    message:"Blog API hit"
  })
})

app.get("/about", (req, res) => {
  res.json({
    message: "About page",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
