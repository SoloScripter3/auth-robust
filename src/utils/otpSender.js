const nodemailer = require("nodemailer");

//generates 6 digit otp
const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

//creating transporter to send the mail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

//sending the otp
const sendOtp = async (receiverDetails) => {
  try {
    await transporter.sendMail(receiverDetails);
    console.log("OTP sent successfully");
  } catch (err) {
    console.error(err);
    throw new Error("Error while sending OTP");
  }
};

module.exports = { otpGenerator, sendOtp };
