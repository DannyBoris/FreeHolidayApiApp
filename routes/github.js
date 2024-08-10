const path = require("path");
const fs = require("fs");
const { uuid, setAuthCookie, signJWTToken } = require("../utils");
const router = require("express").Router();

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;
    const params = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    };

    const searchParams = new URLSearchParams(params).toString();
    const accessTokenUrl = `https://github.com/login/oauth/access_token`;
    const response = await fetch(`${accessTokenUrl}?${searchParams}`);

    const data = await response.text();
    const responseParams = new URLSearchParams(data);
    const accessToken = responseParams.get("access_token");
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { name, id } = await userResponse.json();
    const user = { id: uuid(), name, github_id: id, provider: "github" };
    const userPath = path.join(
      __dirname,
      `../database/users/${user.userId}.json`
    );

    fs.existsSync(userPath) || fs.writeFileSync(userPath, JSON.stringify(user));
    setAuthCookie(res, signJWTToken({ id: user.userId }));
    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? `/dashboard`
        : `http://localhost:8081/dashboard`;
    res.redirect(redirectUrl);
  } catch (err) {
    console.log("GITHUB: ", err);
  }
});

module.exports = router;
