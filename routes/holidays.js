const router = require("express").Router();
const path = require("path");
const holidaysDir = "./database/holidays";
const usersDir = "./database/users";
const fs = require("fs");

router.get("/", (req, res) => {
  const { country, year } = req.query;
  console.log({ user: req.user });
  if (!country || !year) {
    return res.status(400).send("Bad request. Please provide country and year");
  }
  const holidays = fs.readdirSync(holidaysDir);
  const currCountry = holidays.find((h) => h.includes(country.toUpperCase()));

  if (!currCountry) {
    return res.status(404).send("Country not found");
  }

  const countryDir = path.join(holidaysDir, currCountry);
  const currUserFile = path.join(usersDir, `${req.user}.json`);

  if (!fs.existsSync(countryDir)) {
    return res.status(404).send("Data not found");
  }

  const dataPath = path.join(countryDir, `${year}.json`);
  if (!fs.existsSync(dataPath)) {
    return res.status(404).send("Data not found");
  }

  const user = JSON.parse(fs.readFileSync(currUserFile, "utf-8"));
  user.requestsLeft -= 1;
  fs.writeFileSync(currUserFile, JSON.stringify(user));

  const data = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(data));
});

module.exports = router;
