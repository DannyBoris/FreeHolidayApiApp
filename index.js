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

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://holiday-api-app.onrender.com",
        "https://holiday-api-test-front.onrender.com",
        "http://localhost:5174",
      ]
    : ["http://localhost", "http://localhost:5174"];
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(cookies());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${v1}/auth`, routes.auth);
app.use(`${v1}/countries`, routes.countries);
app.use(`${v1}/api_key`, authentication, routes.apiKey);
app.use(`${v1}/holidays`, authentication, authorization, routes.holidays);

app.get("/", (req, res) => {
  // GET HOST
  console.log(req.get("host"));
  console.log(req.headers.host);
  res.send("Hello World");
});

app.get("/healthz", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
