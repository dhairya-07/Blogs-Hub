require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const Blog = require("./models/blogSchema");
const blogRouter = require("./routes/blogRoutes");
const { checkLoggedInUser } = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("MongoDB connected"))
  .catch((err) => {
    console.log("Error: ", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkLoggedInUser("token"));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  console.log(req.user);
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
