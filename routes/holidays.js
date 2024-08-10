const router = require("express").Router();
const path = require("path");
const holidaysDir = "./database/holidays";
const fs = require("fs");
const { getUser, updateUser } = require("../controllers/users");

router.get("/", async (req, res) => {
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

  if (!fs.existsSync(countryDir)) {
    return res.status(404).send("Data not found");
  }

  const dataPath = path.join(countryDir, `${year}.json`);
  if (!fs.existsSync(dataPath)) {
    return res.status(404).send("Data not found");
  }
  console.log(req.user);
  const user = await getUser(req.user);
  user.requestsLeft -= 1;
  await updateUser(req.user, { requestsLeft: user.requestsLeft });
  const data = fs.readFileSync(dataPath, "utf-8");
  res.json(JSON.parse(data));
});

module.exports = router;
