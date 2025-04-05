const Joi = require('joi');

const moduleSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Module name cannot be empty',
      'any.required': 'Module name is required'
    }),
  grade: Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      'number.base': 'Grade must be a number',
      'number.min': 'Grade cannot be less than 0',
      'number.max': 'Grade cannot exceed 100'
    }),
  level: Joi.number()
    .valid(4, 5, 6)
    .required()
    .messages({
      'any.only': 'Level must be 4, 5, or 6'
    }),
  isRPL: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'RPL status must be true/false'
    })
});

const validateModule = (data) => moduleSchema.validate(data, { abortEarly: false });

module.exports = { validateModule };