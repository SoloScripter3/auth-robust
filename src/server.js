const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const session = require("express-session");

//initializing express
const app = express();

//loading env variables
dotenv.config();

//using json
app.use(express.json());

//using routes
app.use("/api/auth", authRoutes);

//using session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      secure: false,
    },
  })
);

//connecting db to the application
connectDB();

//defining port
const port = process.env.PORT || 3000;

//listening to the port
app.listen(port, () => console.log(`http://localhost:${port}`));
