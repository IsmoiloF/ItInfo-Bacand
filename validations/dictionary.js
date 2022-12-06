const Joi = require("joi")

const myFunction = (parent,helpers) =>{
    return parent.term[0].toLowerCase()
}

exports.dictionaryValidation = (data)=>{
    const schema = Joi.object({
        term:Joi.string()
        .required(),
        letter:Joi.string().max(1).default(myFunction)
    })

    return schema.validate(data)
}