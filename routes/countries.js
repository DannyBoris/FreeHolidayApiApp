const router = require("express").Router();

const countries = require("../database/countries.json");

router.get("/", (req, res) => {
  res.json(countries);
});

module.exports = router;
