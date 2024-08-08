const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const { uuid } = require("../utils");

const usersDir = "./database/users";
const users = fs.readdirSync(usersDir);

router.post("/generate_api_key", (req, res) => {
  const currUserFile = users.find((user) => user.includes(req.user));
  const currUser = JSON.parse(
    fs.readFileSync(path.join(usersDir, currUserFile), "utf-8")
  );
  const apiKey = uuid();
  currUser.apiKey = apiKey;
  fs.writeFileSync(
    path.join(usersDir, `${req.user}.json`),
    JSON.stringify(currUser)
  );
  res.send({ apiKey });
});

router.get("/get_api_key", (req, res) => {
  const currUserFile = users.find((user) => user.includes(req.user));
  const currUser = JSON.parse(
    fs.readFileSync(path.join(usersDir, currUserFile), "utf-8")
  );
  res.send({ apiKey: currUser.apiKey });
});

module.exports = router;
