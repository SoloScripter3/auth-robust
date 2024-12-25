const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

//initializing express
const app = express();

//loading env variables
dotenv.config();

//using json
app.use(express.json());

//using routes
app.use("/api/auth", authRoutes);

//connecting db to the application
connectDB();

//defining port
const port = process.env.PORT || 3000;

//listening to the port
app.listen(port, () => console.log(`http://localhost:${port}`));
