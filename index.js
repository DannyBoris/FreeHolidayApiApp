const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const cors = require("cors");
const express = require("express");
const app = express();
const cookies = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes");
const morgan = require("morgan");
const { authentication, authorization } = require("./middlewares/auth");
const PORT = process.env.PORT || 3000;
const v1 = "/api/v1";

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(express.static(path.join(__dirname, process.env.PUBLIC_DIR + "/dist")));

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(cookies());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${v1}/auth`, routes.auth);
app.use(`${v1}/countries`, routes.countries);
app.use(`${v1}/api_key`, authentication, routes.apiKey);
app.use(`${v1}/holidays`, authorization, routes.holidays);
app.use(`${v1}/mailing`, routes.mailing);
app.use(`${v1}/github`, routes.github);

app.get("/", (req, res) => {
  // GET HOST
  console.log(req.get("host"));
  console.log(req.headers.host);
  res.send("Hello World");
});

app.get("/healthz", (req, res) => {
  res.send("OK");
});

// if not found, send to frontend
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, process.env.PUBLIC_DIR + "/dist/index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
