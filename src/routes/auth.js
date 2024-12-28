const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { otpGenerator, sendOtp } = require("../utils/otpSender");
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

    //sending mail for otp verification
    const otp = otpGenerator();

    const receiverDetails = {
      from: process.env.EMAIL,
      to: email,
      subject: process.env.SUBJECT,
      text: `${process.env.TEXT} ${otp}`,
    };

    await sendOtp(receiverDetails);

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //storing the details temporarily in the session
    req.session.tempUserData = {
      username,
      email,
      hashedPassword,
      otp,
    };

    res.status(200).send("otp sent successfully");
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
