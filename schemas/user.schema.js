const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
// const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  // role: role.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  // role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
