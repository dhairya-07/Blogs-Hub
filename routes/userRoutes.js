const { Router } = require("express");
const User = require("../models/userSchema");
const router = Router();

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordandGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", {
      error: "Incorrect Email or password",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});
module.exports = router;
