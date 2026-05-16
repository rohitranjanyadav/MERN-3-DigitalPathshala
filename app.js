require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./database");
const Blog = require("./model/blogModel");

const app = express();
app.use(express.json());

const { multer, storage } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });

const fs = require("fs");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

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
  const blogs = await Blog.find(); // Returns Array

  res.status(200).json({
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id); // Returns Object

  if (!blog) {
    return res.status(404).json({
      message: "Blog Not Found!",
    });
  }

  res.status(200).json({
    message: "Blog Fetched Successfully!",
    data: blog,
  });
});

app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id);
  const imageName = blog.image;

  fs.unlink(`storage/${imageName}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Image Deleted Successfully");
    }
  });

  const deletedBlog = await Blog.findByIdAndDelete(id);

  res.status(200).json({
    message: "Blog Deleted Successfully!",
    deleted: deletedBlog,
  });
});

app.patch("/blog/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;

  const { title, subtitle, description } = req.body;
  let imageName;

  if (req.file) {
    imageName = req.file.filename;
    const blog = await Blog.findById(id);
    const oldImageName = blog.image;

    fs.unlink(`storage/${oldImageName}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Updated Successfully!");
      }
    });
  }
  await Blog.findByIdAndUpdate(id, {
    title: title,
    subtitle: subtitle,
    description: description,
  });

  res.status(200).json({
    message: "Blog Updated Successfully!",
  });
});

app.use(express.static("./storage"));

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
