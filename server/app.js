const express = require("express");
const cookieParser = require("cookie-parser");

const ErrorHandler = require("./middleware/Error");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan('dev'));

//routes
const user = require("./controller/userController");

app.get("/", (req, res) => {
  res.send("welcome to my server");
});
app.use("/api/v2/user", user);

//for error handling
app.use(ErrorHandler);

module.exports = app;
