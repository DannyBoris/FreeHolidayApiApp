const jwt = require("jsonwebtoken");
const { getUserByApiKey } = require("../controllers/users");

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

exports.authorization = async (req, res, next) => {
  const { apiKey } = req.query;
  if (!apiKey) {
    return res
      .status(401)
      .send({ message: "Unauthorized. Please provide an API key" });
  }
  const user = await getUserByApiKey(apiKey);

  if (!user) {
    return res.status(401).send({ message: "Unauthorized. Invalid API key" });
  }
  console.log("User", user);
  req.user = user.id;
  console.log(req.user);
  next();
};
