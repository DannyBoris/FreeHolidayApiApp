const express = require("express");
const router = express.Router();

router.get("/callback", (req, res) => {
  res.send("Google callback route");
  const { code } = req.query;
  fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3001/api/v1/google/callback",
      grant_type: "authorization_code",
    }),
  })
    .then((response) => response.json())
    .then(console.log)
    .catch(console.error);
});

module.exports = router;
