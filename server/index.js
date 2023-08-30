const {router} = require("./routes/authRoutes");

const app = require("express")();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8000;

// default homepage
app.get("/", (req, res) => {
  res.status(200).send("server up...");
});

// other routes
app.use(router);

app.listen(PORT, () => {
  console.log("server running at PORT:" + PORT);
});
