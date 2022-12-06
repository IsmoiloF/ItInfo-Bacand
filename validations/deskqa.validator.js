const Joi = require("joi")


const deskQaschema = Joi.object({
    qa_id:Joi.string()
    .required(),
    desc_id:Joi.string()
    .required()
})

module.exports = deskQaschema