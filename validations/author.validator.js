// const { required } = require("joi")
const Joi = require("joi")

const generateNickName = (parent,helpers) =>{
    return parent.author_first_name.toLowerCase() + '-' + parent.author_last_name.toLowerCase()
}

const authorSchema = Joi.object({
    author_first_name:Joi.string()
    .pattern(new RegExp("^[a-zA-Z]{1,50}$"))
    .required(),
    author_last_name:Joi.string()
    .pattern(new RegExp("^[a-zA-Z]{1,50}$"))
    .required(),
    author_nick_name:Joi.string().max(30).default(generateNickName),
    author_email:Joi.string().email(),
    author_phone:Joi.string().pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
    author_password:Joi.string().min(6).max(30),
    author_info:Joi.string(),
    author_position:Joi.string(),
    author_photo:Joi.string().default("/author/default.png"),
    author_is_active:Joi.boolean().default(false),
    is_expert:Joi.boolean().default(false)
})


module.exports = authorSchema