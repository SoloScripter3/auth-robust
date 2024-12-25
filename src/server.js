const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//initializing express
const app = express();

//loading env variables
dotenv.config();

//using json
app.use(express.json());

//connecting db to the application
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//defining port
const port = process.env.PORT || 3000;

//listening to the port
app.listen(port, () => console.log(`http://localhost:${port}`));
