const express = require("express");
const { User } = require("../model/userModel");
const { getToken } = require("../util");
const route = express.Router();

// route.get("/createadmin", async (req, res) => {
//   try {
//     const user = new User({
//       name: "Basir",
//       email: "basirutube123@gmail.com",
//       password: "12345",
//       isAdmin: true,
//     });

//     const newuser = await user.save();
//     res.send(newuser);
//   } catch (error) {
//     res.status(401).send(error.message);
//   }
// });

//User Sign In logic

route.post("/signin", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401).send("Invalid username or password");
  }
});

//User Register logic

route.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(500).send("User already exists");
    return;
  }
  let newuser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  console.log(newuser);

  newuser = await newuser.save();

  res.send({
    _id: newuser._id,
    name: newuser.name,
    email: newuser.email,
    isAdmin: newuser.isAdmin,
    token: getToken(newuser),
  });
});

module.exports = route;
