var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var fileUpload = require("express-fileupload");
var bodyParser = require('body-parser')
var cors = require("cors");

var indexRouter = require("./routes/index");
var scoreRoute = require("./routes/score");

var app = express();

app.locals.ii = 0;
global.ii = 0;
global.chat = [
  {
    username: "",
    msg: "",
  },
];

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "secret" }));
app.use(
  fileUpload()
);

app.use("/", indexRouter);
app.use("/score", scoreRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
