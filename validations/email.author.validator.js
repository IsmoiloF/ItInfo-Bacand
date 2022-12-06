const Joi = require("joi")

const emailauthorSchema = Joi.object({
    login: Joi.string().email().required(),
    author_password:Joi.string().min(5).max(30).required()
})

module.exports = emailauthorSchema