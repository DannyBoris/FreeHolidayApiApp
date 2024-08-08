const jwt = require("jsonwebtoken");
const usersDir = "./database/users";
const fs = require("fs");

exports.authentication = (req, res, next) => {
  const { authToken } = req.cookies;

  console.log({ cookies: req.cookies });
  if (!authToken) {
    return res.status(401).send({ message: "Please login" });
  }
  try {
    const payload = jwt.verify(authToken, "secret");
    console.log(payload);
    req.user = payload.id;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Please login" });
  }
};

exports.authorization = (req, res, next) => {
  const { apiKey } = req.query;
  if (!apiKey) {
    return res
      .status(401)
      .send({ message: "Unauthorized. Please provide an API key" });
  }
  const users = fs.readdirSync(usersDir);
  console.log({ user: req.user });
  const currUserFile = users.find((user) => user.includes(req.user));
  const currUser = JSON.parse(fs.readFileSync(usersDir + "/" + currUserFile));
  if (!currUser.apiKey || apiKey !== currUser.apiKey) {
    return res.status(401).send({ message: "Unauthorized. Invalid API key" });
  }

  next();
};
