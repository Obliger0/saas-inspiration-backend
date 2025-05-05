const Joi = require('joi');

const extractLinksSchema = Joi.object({
  url: Joi.string().uri().required(),
});

const addInspirationsSchema = Joi.object({
  urls: Joi.array().items(Joi.string().uri()).min(1).required(),
});

module.exports = {
  extractLinksSchema,
  addInspirationsSchema,
};
