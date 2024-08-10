const router = require("express").Router();
const fs = require("fs");
const { uuid } = require("../utils");
const { updateUser, getUser } = require("../controllers/users");

const usersDir = "./database/users";
const users = fs.readdirSync(usersDir);

router.post("/generate_api_key", (req, res) => {
  const apiKey = uuid();
  updateUser(req.user, { apiKey });
  res.send({ apiKey });
});

router.get("/get_api_key", (req, res) => {
  const user = getUser(req.user);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  if (!user.apiKey) {
    return res.status(404).send({ message: "API key not found" });
  }
  res.send({ apiKey: user.apiKey });
});

module.exports = router;
