const Joi = require("joi")

const authorSocialschema = Joi.object({
    author_id:  Joi.string(),
    social_id:  Joi.string(),
    social_link:Joi.string()
    .required()
})

module.exports = authorSocialschema