const Joi = require("joi")

const emailPassSchema = Joi.object({
    login: Joi.string().email().required(),
    user_password:Joi.string().min(5).max(30).required()
})

module.exports = emailPassSchema