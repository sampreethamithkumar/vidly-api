const { Genre, validate } = require("../models/genre");
const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Get - request for all the genre
route.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Post - request for genre
route.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

// PUT request to the update the genre
route.put(`/:id`, auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre is not present.");

  res.send(genre);
});

// DELETE request to delete the genre
route.delete(`/:id`, [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("Genre is not present.");

  res.send(genre);
});

// GET request for the specifed genres
route.get(`/:id`, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("Genre is not present.");

  res.send(genre);
});

module.exports = route;
