const Joi = require("joi")

const synonymSchema = Joi.object({
    desc_id:Joi.string(),
    dict_id:Joi.string()
})

module.exports = synonymSchema