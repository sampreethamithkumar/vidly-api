const express = require("express");
const route = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");

// Get - Request for movies
route.get("/", async (req, res) => {
  const movies = await Movie.find();

  res.send(movies);
});

route.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre Id.");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  movie = await movie.save();
  res.send(movie);
});

// PUT request to the update the movie
route.put(`/:id`, auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre Id.");

  let movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.name,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );
  if (!movie) return res.status(404).send("movie is not present.");

  res.send(movie);
});

// DELETE request to delete the movie
route.delete(`/:id`, [auth, admin], async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send("movie is not present.");

  res.send(movie);
});

// GET request for the specifed movie
route.get(`/:id`, async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send("Movie is not present.");

  res.send(movie);
});

module.exports = route;
