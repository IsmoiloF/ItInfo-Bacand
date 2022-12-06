const {Schema,model} = require("mongoose")

const dictionarySchema = new Schema({
    term:{
        type:String,
        required:true,
        trim:true,
        unique:[true,"Bu termin oldin kiritilgan."]
    },
    letter:{
        type:String,
        min:[1,"Minimum 1 ta letter bo'lishi kerak."],
        max:[1,"Maximum 1 ta qiymat bo'lishi kerak"],
        uppercase:true
    }
},
{versionKey:false})
module.exports = model("Dictionary",dictionarySchema)