const {Schema,model} = require("mongoose")

const authorSchema = new Schema({
    author_first_name:{
        type:String,
        trim:true,
        required:true
     },
    author_last_name:{
        type:String,
        trim:true,
        required:true
    },
    author_nick_name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    author_email:{
        type:String,
        required:true,
        unique:true
    },
    author_phone:{
        type:String,
        required:true
    },
    author_password:{
        type:String,
        required:true,
        unique:true
    },
    author_info:{
        type:String,
        required:true
    },
    author_position:{
        type:String,
        required:true
    },
    author_photo:{
        type:String
    },
    author_is_expert:{
        type:Boolean
    },
    author_is_active:{
        type:Boolean,
        default:false
    },
    author_activate_link:{
        type:String
    },
    is_expert:{
        type:Boolean
    },
    author_token:{
        type:String
    }
},
{versionKey:false})

module.exports = model("Author",authorSchema)

