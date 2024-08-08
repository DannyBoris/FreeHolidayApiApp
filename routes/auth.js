const router = require("express").Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const { authentication } = require("../middlewares/auth");
const { uuid, isExpired, expireAfter } = require("../utils");
const usersDir = "./database/users";
const users = fs.readdirSync(usersDir);

router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    const cookies = req.cookies;
    if (cookies.authToken) {
      const payload = jwt.decode(cookies.authToken);
      if (isExpired(payload.iat)) {
        res.clearCookie("authToken");
        return res.status(401).send("Token expired. Unauthorized");
      }
      const isValid = jwt.verify(cookies.authToken, "secret");
      if (isValid) {
        return res.send("Already logged in");
      } else {
        res.clearCookie("authToken");
      }
    }
  }
  const { email, password } = req.body;
  const currUserFile = users.find((user) => {
    const userObj = JSON.parse(
      fs.readFileSync(path.join(usersDir, user), "utf-8")
    );
    if (userObj.email === email) {
      return true;
    }
  });

  const currUser = JSON.parse(
    fs.readFileSync(path.join(usersDir, currUserFile), "utf-8")
  );

  console.log({ currUser });
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const userPath = path.join(usersDir, `${currUser.id}.json`);
  if (!fs.existsSync(userPath)) {
    return res.status(404).send("User not found");
  }
  const user = JSON.parse(fs.readFileSync(userPath, "utf-8"));
  if (user.hash !== hash) {
    return res.status(401).send("Unauthorized");
  }
  if (!req.cookies.authToken) {
    const jwtToken = jwt.sign({ id: user.id, email, hash }, "secret");
    res.cookie("authToken", jwtToken, {
      httpOnly: false,
      secure: false,
      maxAge: expireAfter,
    });
  }
  res.send(currUser.id);
});
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const userId = uuid();

  fs.writeFileSync(
    path.join(usersDir, `${userId}.json`),
    JSON.stringify({
      id: userId,
      email,
      hash,
      apiKey: null,
      requestsLeft: 1000,
    })
  );
  const jwtToken = await new Promise((resolve, reject) => {
    jwt.sign({ id: userId, email, hash }, "secret", (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
  //send cookie
  res.cookie("authToken", jwtToken, {
    httpOnly: false,
    secure: false,
    maxAge: expireAfter,
  });

  res.send({ userId });
});

router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.send({ message: "Logged out" });
});

router.get("/me", authentication, (req, res) => {
  try {
    const user = JSON.parse(
      fs.readFileSync(path.join(usersDir, `${req.user}.json`), "utf-8")
    );
    res.send({
      email: user.email,
      requestsLeft: user.requestsLeft,
      apiKey: user.apiKey,
    });
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Please login" });
  }
});

module.exports = router;
