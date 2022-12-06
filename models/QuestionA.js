const {Schema,model} = require("mongoose")

const questionanswerSchema = new Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    is_checked:{
        type:Boolean,
        required:true
    },
    expert_id:{
        type:Schema.Types.ObjectId,
        ref:"Author"
    }
},
{versionKey:false,timestamps:true})

module.exports = model("QuestionA",questionanswerSchema)