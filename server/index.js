const routes = require("./routes/routes");
const mongoose = require("mongoose");

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
dotenv.config();

// constants
const PORT = process.env.PORT || 8000;
const DBURI = process.env.DBURI;

// connect to DB
mongoose
  .connect(DBURI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("database connection error...");
    console.log("ERROR:" + err);
  });

// middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Origin', 'https://bsocial-0vnc.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});

// default homepage
app.get("/", (req, res) => {
  res.status(200).send("server up...");
});

// other routes
app.use(routes);

app.listen(PORT, () => {
  console.log("server running at PORT:" + PORT);
});
