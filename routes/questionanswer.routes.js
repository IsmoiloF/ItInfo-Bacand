const {Router} = require("express")
const { addQuestionAnswer, getQuestionAnswers, getQuestionAnswer, updateQuestionAnswer, deleteQuestionAnswer } = require("../controllers/questiona.controller")

const router = Router()
const adminPolice = require("../middleware/adminPolice")
const Validators = require("../middleware/validator")

router.get("/",getQuestionAnswers)
router.post("/",Validators("questiona"),addQuestionAnswer)
router.get("/:id",getQuestionAnswer)
// router.put("/:id",adminPolice,updateQuestionAnswer)
// router.delete("/:id",adminPolice,deleteQuestionAnswer)


module.exports = router