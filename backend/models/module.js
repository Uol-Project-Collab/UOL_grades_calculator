const Joi = require("joi");

const moduleSchema = Joi.object({
  moduleName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Module name cannot be empty",
    "any.required": "Module name is required",
  }),
  moduleCode: Joi.string().length(6).required().messages({
    "string.empty": "Module code cannot be empty",
    "string.length": "Module code must be 6 characters",
    "any.required": "Module code is required",
  }),
  grade: Joi.string()
    .required()
    .custom((value, helper) => {
      if (value === "RPL") return value;
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return helper.message(
          "Grade must be either 'RPL' or a number from 0.00 to 100.00 with up to two decimal places"
        );
      }
      const num = parseFloat(value);
      if (num < 0 || num > 100) {
        return helper.message("Grade must be a number from 0.00 to 100.00");
      }
      return value;
    })
    .messages({
      "string.empty": "Grade cannot be empty",
      "any.required": "Grade is required",
    }),
  level: Joi.number().valid(4, 5, 6).required().messages({
    "any.only": "Level must be 4, 5, or 6",
  }),
});

const validateModule = (data) =>
  moduleSchema.validate(data, { abortEarly: false });

module.exports = { validateModule };
