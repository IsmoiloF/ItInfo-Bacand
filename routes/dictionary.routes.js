const {Router} = require("express")
const { addDictionary, getDictionaries, updateDictionary, getDictionary, getTermByLetter, deleteDictionary } = require("../controllers/dictionary.controller")

const router = Router()
const adminPolice = require("../middleware/adminPolice")
const Validators = require("../middleware/validator")

router.get("/",getDictionaries)
router.post("/",Validators("dictionary"),addDictionary)
router.get("/:id",getDictionary)
// router.put("/:id",adminPolice,updateDictionary)
// router.delete("/:id",adminPolice,deleteDictionary)
router.get("/letter/:letter",getTermByLetter)



module.exports = router

