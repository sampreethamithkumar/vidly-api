const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  isGold: {
    type: Boolean,
    default: true,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(3).max(30).required(),
  });

  return schema.validate({
    name: customer.name,
    isGold: customer.isGold,
    phone: customer.phone,
  });
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
