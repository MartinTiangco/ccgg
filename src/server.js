const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const connectToDatabase = require("./database/db-connect");
const indexRouter = require("./routes/index");

const port = process.env.PORT || "3001";

const resolvedDirPath = path.resolve("./frontend/build");
const resolvedPath = path.resolve("./frontend/build/index.html");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// use API routers for different URLs
app.use("/api", indexRouter);

// This middleware informs the express application to serve our compiled React files
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static(resolvedDirPath));
  app.get("*", (req, res) => {
    res.sendFile(resolvedPath);
  });
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
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
