const Joi = require("joi")

const descTopicSchema = Joi.object({
    desc_id:Joi.string()
    .required(),
    topic_id:Joi.string()
    .required()
})  

module.exports = descTopicSchema

