const express = require("express");
const genre = require("../routes/genre");
const customer = require("../routes/customer");
const movie = require("../routes/movie");
const rental = require("../routes/rental");
const users = require("../routes/user");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genre);
  app.use("/api/customers", customer);
  app.use("/api/movies", movie);
  app.use("/api/rentals", rental);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
