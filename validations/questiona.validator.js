const Joi = require("joi")

const questionAnswerschema = Joi.object({
    question:Joi.string()
    .required(),
    answer:Joi.string()
    .required(),
    is_checked:Joi.boolean()
    .required(),
    expert_id:Joi.string()
})
module.exports = questionAnswerschema