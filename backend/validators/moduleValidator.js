const Joi = require('joi');

// Validate a single module object
const moduleSchema = Joi.object({
  moduleCode: Joi.string().required().messages({
    'string.empty': 'Module Code cannot be empty',
    'any.required': 'Module Code is required',
  }),
  grade: Joi.string()
    .required()
    .custom((value, helper) => {
      if (value === 'RPL') return value;
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return helper.message(
          "Grade must be either 'RPL' or a number from 0.00 to 100.00 with up to two decimal places"
        );
      }
      const num = parseFloat(value);
      if (num < 0 || num > 100) {
        return helper.message('Grade must be a number from 0.00 to 100.00');
      }
      return value;
    })
    .messages({
      'string.empty': 'Grade cannot be empty',
      'any.required': 'Grade is required',
    }),
});

// Schema for POST body (array of modules)
const bodySchema = Joi.object({
  modules: Joi.array().items(moduleSchema).min(1).required().messages({
    'array.base': 'Modules must be an array',
    'array.min': 'At least one module must be provided',
    'any.required': 'Modules array is required',
  }),
});

const validateAddModules = (req, res, next) => {
  const { error, value } = bodySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value;
  next();
};

// Schema for updating a module (PUT route)
const updateSchema = Joi.object({
  grade: Joi.string()
    .required()
    .custom((value, helper) => {
      if (value === 'RPL') return value;
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return helper.message(
          "Grade must be either 'RPL' or a number from 0.00 to 100.00 with up to two decimal places"
        );
      }
      const num = parseFloat(value);
      if (num < 0 || num > 100) {
        return helper.message('Grade must be a number from 0.00 to 100.00');
      }
      return value;
    })
    .messages({
      'string.empty': 'Grade cannot be empty',
      'any.required': 'Grade is required',
    }),
});

const validateModuleUpdate = (req, res, next) => {
  const { error, value } = updateSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value;
  next();
};

module.exports = { validateAddModules, validateModuleUpdate };
