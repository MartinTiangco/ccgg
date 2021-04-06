const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Express API is running");
});

module.exports = router;
