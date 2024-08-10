const crypto = require("crypto");
const jwt = require("jsonwebtoken");
exports.uuid = () => {
  const uuid = crypto.randomUUID({ disableEntropyCache: true });
  return uuid;
};

exports.expireAfter = (1000 * 60 * 60 * 24 * 7) / 7 / 48; // 30 seconds

exports.isExpired = (time) => {
  return time + this.expireAfter > Date.now();
};

exports.setAuthCookie = (res, payload) => {
  res.cookie("authToken", payload, {
    httpOnly: true,
    secure: false,
    maxAge: this.expireAfter,
  });
};

exports.signJWTToken = (payload) => jwt.sign(payload, "secret");
