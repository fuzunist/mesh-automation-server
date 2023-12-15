const Joi = require("joi");

const loginValidation = Joi.object({
  Password: Joi.string().required().min(3),
  Username: Joi.string().required().min(3),
});


const registerValidation = Joi.object({
  Username: Joi.string().required().min(3),
  Password: Joi.string().required().min(3),
  Email: Joi.string().email().required()
})

exports.module = { loginValidation, registerValidation };
