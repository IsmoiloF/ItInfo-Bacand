const Joi = require("joi")


const tagSchema = Joi.object({
    topic_id:Joi.string()
    .required(),
    category_id:Joi.string()
    .required()
})


module.exports = tagSchema