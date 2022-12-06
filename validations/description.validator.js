const Joi = require("joi")

const descriptionSchema = Joi.object({
    dict_id:Joi.string()
    .length(24),
    category_id:Joi.string()
    .length(24),
    description:Joi.string()
    .required()
})

module.exports = descriptionSchema
