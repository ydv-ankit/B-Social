const { Router } = require("express");
const router = Router();

router.post("/signup", (req, res) => {
  res.send("sign up")
});

module.exports = { router };