const path = require("path");
const fs = require("fs");

const usersDir = path.join(__dirname, "../database/users");

exports.saveUser = (user) => {
  const userPath = path.join(usersDir, `${user.id}.json`);
  fs.existsSync(userPath) || fs.writeFileSync(userPath, JSON.stringify(user));
};

exports.getUser = (userId) => {
  const userPath = path.join(usersDir, `${userId}.json`);
  if (!fs.existsSync(userPath)) return null;
  return JSON.parse(fs.readFileSync(userPath, "utf-8"));
};

exports.getUserByApiKey = (apiKey) => {
  const users = fs.readdirSync(usersDir);
  const user = users.find((user) => {
    const userObj = JSON.parse(
      fs.readFileSync(path.join(usersDir, user)),
      "utf-8"
    );
    return userObj.apiKey === apiKey;
  });
  if (!user) return null;
  return JSON.parse(fs.readFileSync(path.join(usersDir, user), "utf-8"));
};

exports.updateUser = async (userId, data) => {
  const userPath = path.join(usersDir, `${userId}.json`);
  const user = JSON.parse(fs.readFileSync(userPath, "utf-8"));
  fs.writeFileSync(userPath, JSON.stringify({ ...user, ...data }));
};

exports.deleteUser = async (userId) => {
  const userPath = path.join(usersDir, `${userId}.json`);
  fs.unlinkSync(userPath);
};
