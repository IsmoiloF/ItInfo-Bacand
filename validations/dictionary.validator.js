const Joi = require("joi")

const myFunction = (parent,helpers) =>{
    return parent.term[0].toLowerCase()
}

const dictionarySchema = Joi.object({
    term:Joi.string()
    .required(),
    letter:Joi.string().max(1).default(myFunction)
})

module.exports = dictionarySchema