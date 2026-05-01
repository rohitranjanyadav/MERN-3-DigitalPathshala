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
  const { title, subtitle, description } = req.body;
  const fileName = req.file.filename;

  if (!title || !subtitle || !description) {
    return res.status(400).json({
      message: "Please provide all the fields",
    });
  }

  await Blog.create({
    title,
    subtitle,
    description,
    image: fileName,
  });

  res.status(200).json({
    message: "Blog API hit",
  });
});

app.get("/blog", async (req, res) => {
  const blogs = await Blog.find();

  res.status(200).json({
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

app.use(express.static('./storage'))

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
