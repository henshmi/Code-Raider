const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    codebaseSchema: Joi.object().keys({
      title: Joi.string().allow('').required(),
      description: Joi.string().required(),
      price: Joi.number().integer().min(0).required(),
      tags: Joi.array().items(Joi.string()).optional(),
      imageUrl: Joi.string().optional()
    }),
    orderSchema: Joi.object().keys({
      codebase_id: Joi.string().required(),
    }),
    sparkSchema: Joi.object().keys({
      _id: Joi.string().required()
    })
  }
}