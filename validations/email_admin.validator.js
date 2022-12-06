const Joi = require("joi")

const emailAdminSchema = Joi.object({
    login: Joi.string().email().required(),
    admin_password:Joi.string().min(5).max(30).required()
})

module.exports = emailAdminSchema