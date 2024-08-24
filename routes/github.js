const path = require("path");
const fs = require("fs");
const { uuid, setAuthCookie, signJWTToken } = require("../utils");
const { upsertUser } = require("../controllers/users");
const router = require("express").Router();

router.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;
    const params = {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
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
    await upsertUser(user);

    setAuthCookie(res, signJWTToken({ id: user.id }));
    const redirectUrl =
      process.env.NODE_ENV === "production"
        ? `/dashboard`
        : `http://localhost:8080/dashboard`;
    res.redirect(redirectUrl);
  } catch (err) {
    console.log("GITHUB: ", err);
  }
});

module.exports = router;
