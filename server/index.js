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
const DBName = process.env.DBName;

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

// default homepage
app.get("/", (req, res) => {
  res.status(200).send("server up...");
});

// other routes
app.use(routes);

app.listen(PORT, () => {
  console.log("server running at PORT:" + PORT);
});
