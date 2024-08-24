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
const { saveApiRequest } = require("./controllers/apiRequests");
const { log } = require("console");
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
// wrap all routes in /api/v1
app.use((req, res, next) => {
  req.on("close", async () => {
    saveApiRequest({
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      userId: req.user,
    })
      .then()
      .catch(console.error);
  });
  req.on("end", async () => {
    //dont track healtz
    if (req.originalUrl === "/healthz") {
      return;
    }
    saveApiRequest({
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      userId: req.user,
    })
      .then()
      .catch(console.error);
  });
  console.log("Request ended", req.method, res.statusCode);
  next();
});
app.use(`${v1}/auth`, routes.auth);
app.use(`${v1}/countries`, routes.countries);
app.use(`${v1}/api_key`, authentication, routes.apiKey);
app.use(`${v1}/holidays`, authorization, routes.holidays);
app.use(`${v1}/mailing`, routes.mailing);
app.use(`${v1}/github`, routes.github);
app.use(`${v1}/google`, routes.google);

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

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const _10times = async () => {
//   const ids = require("./google-cal-ids.json");

//   for (let i = 0; i < Object.keys(ids).length; i++) {
//     const key = Object.keys(ids)[i];

//     const url = `https://www.googleapis.com/calendar/v3/calendars/en.ad#holiday@group.v.calendar.google.com`;
//     const token = `ya29.a0AcM612xQXIEaki_fIor5EdmjHPil6L0YHL_T9FM-gNPoMDLPAdQnJ1j4l-Bnb4v0idLmA6eGKr4jZocZ4cY2xLSZCJ-Ky1jwPAXENqxk01boSGiRdaG_IZCrzbKSiAUyDa0t5hRiMHnzJs7vsh_Ln1YY43zc1yhTECTKaCgYKARwSARISFQHGX2Mi0UmJKpay64UWRfPu9gA_Fg0171`;
//     console.log("fetching", i);
//     await fetch(
//       `https://www.googleapis.com/calendar/v3/calendars/en.ad#holiday@group.v.calendar.google.com/events?access_token=ya29.a0AcM612xQXIEaki_fIor5EdmjHPil6L0YHL_T9FM-gNPoMDLPAdQnJ1j4l-Bnb4v0idLmA6eGKr4jZocZ4cY2xLSZCJ-Ky1jwPAXENqxk01boSGiRdaG_IZCrzbKSiAUyDa0t5hRiMHnzJs7vsh_Ln1YY43zc1yhTECTKaCgYKARwSARISFQHGX2Mi0UmJKpay64UWRfPu9gA_Fg0171`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     )
//       .then((res) => res.json())
//       .then((data) => console.log(data.error.errors))
//       .catch((err) => console.error(err.errors));
//     await sleep(50);
//   }
// };

// _10times();
