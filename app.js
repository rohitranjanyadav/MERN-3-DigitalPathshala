require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database");
const Blog = require("./model/blogModel");

const app = express();
app.use(express.json());

const { multer, storage } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });

connectToDatabase();

app.get("/", (req, res) => {
  res.json({
    message: "Home page",
  });
});

app.post("/blog", upload.single("image"), async (req, res) => {
  const { title, subtitle, description, image } = req.body;

  if (!title || !subtitle || !description || !image) {
    return res.status(400).json({
      message: "Please provide all the fields",
    });
  }

  await Blog.create({
    title,
    subtitle,
    description,
    image,
  });
  res.status(200).json({
    message: "Blog API hit",
  });
});

app.get("/about", (req, res) => {
  res.json({
    message: "About page",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
