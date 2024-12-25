const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    //getting the credentials from frontend
    const { username, email, password } = req.body;

    //checking if the user already exists
    const user = await User.findOne({ username, email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    newUser.save();
    res.status(200).send("User created successfully");
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
