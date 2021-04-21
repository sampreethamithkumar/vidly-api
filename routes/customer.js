const { Customer, validate } = require("../models/customer");
const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Get - request for all the customer
route.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

// Post - request for customer
route.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

// PUT - request to the update the customer
route.put(`/:id`, auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!customer) return res.status(404).send("customer is not present.");

  res.send(customer);
});

// DELETE request to delete the customer
route.delete(`/:id`, [auth, admin], async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("customer is not present.");

  res.send(customer);
});

// GET request for the specifed genres
route.get(`/:id`, async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("Genre is not present.");

  res.send(customer);
});

module.exports = route;
