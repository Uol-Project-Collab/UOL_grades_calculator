const Joi = require("joi");

const paramsSchema = Joi.object({
  studentId: Joi.string().required().messages({
    "any.required": "Student ID required",
  }),
  moduleId: Joi.string().required().messages({
    "any.required": "Module ID is required",
  }),
});

const validateModuleParams = (req, res, next) => {
  const { error } = paramsSchema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const bodySchema = Joi.object({
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
    })
    .options({ allowUnknown: false }),
});

const validateModuleBody = (req, res, next) => {
  const { error, value } = bodySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.body = value;

  if (
    !req.body ||
    (typeof req.body === "object" && Object.keys(req.body).length === 0)
  ) {
    return res.status(400).json({ error: "Request body is required" });
  }
  next();
};

module.exports = { validateModuleParams, validateModuleBody };
