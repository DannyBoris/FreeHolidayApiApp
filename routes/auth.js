const router = require("express").Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { authentication } = require("../middlewares/auth");
const { isExpired, setAuthCookie, signJWTToken } = require("../utils");
const { getUser, saveUser, getUserByEmail } = require("../controllers/users");

router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    const cookies = req.cookies;
    if (cookies.authToken) {
      const payload = jwt.decode(cookies.authToken);
      if (isExpired(payload.iat)) {
        res.clearCookie("authToken");
        return res.status(401).send({ message: "Token expired" });
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
  const user = await getUserByEmail(email);
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  console.log(hash, user);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  if (user.hash !== hash) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  if (!req.cookies.authToken) {
    setAuthCookie(res, signJWTToken({ id: user.id, email, hash }));
  }
  res.send({ userId: user.id });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const userId = await saveUser({ email, hash });
  setAuthCookie(res, signJWTToken({ id: userId, email, hash }));
  res.send({ userId });
});

router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.send({ message: "Logged out" });
});

router.get("/me", authentication, async (req, res) => {
  try {
    const user = await getUser(req.user);
    console.log({ user });
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
