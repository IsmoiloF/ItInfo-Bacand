const {Schema,model} = require("mongoose")

const author_socialSchema = new Schema({
    author_id:{
        type:Schema.Types.ObjectId,
        ref:"Author"
    },
    social_id:{
        type:Schema.Types.ObjectId,
        ref:"Social"
    },
    social_link:{
        type:String,
        required:true,
        unique:true
    }
},
{versionKey:false})

module.exports = model("Author_Social",author_socialSchema)