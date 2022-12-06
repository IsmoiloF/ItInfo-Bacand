const Joi  = require("joi")

const socialSchema = Joi.object({
    social_name:Joi.string()
    .required(),
    social_icon_file:Joi.string()
    .required()
})

module.exports = socialSchema