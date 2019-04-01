const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/api", indexRouter);
app.get("*", (req, res) => {
  res.sendFile("build/index.html", { root: __dirname });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// TODO Project Acorn: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
  // Do not send stack trace of error message when in production
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.locals.error = "500: Internal Server Error";
    res.render("error");
  });
} else {
  // Log stack trace of error message while in development
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(err);
    res.send(err);
  });
}

module.exports = app;
