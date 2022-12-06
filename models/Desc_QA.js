const {Schema,model, SchemaType} = require("mongoose")

const deskqaSchema = new Schema({
    qa_id:{
        type:Schema.Types.ObjectId,
        ref:"QuestionA",
        required:true
    },
    desc_id:{
        type:Schema.Types.ObjectId,
        ref:"Description",
        required:true
    }
},
{versionKey:false})

module.exports = model("Desc_QA",deskqaSchema)