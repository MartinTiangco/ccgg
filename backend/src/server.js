const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectToDatabase = require("./database/db-connect");

const indexRouter = require("./routes/index");

const app = express();
const port = process.env.PORT || "3001";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// use API routers for different URLs
app.use("/", indexRouter);

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
  res.send(`Error: ${err.status} - ${err.message}`);
});

// Connect to the database
connectToDatabase().then(
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  })
);
