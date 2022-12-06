const {Router} = require("express")
const { getSynonyms, addSynonym, getSynonym, updateSynonym, deleteSynonym } = require("../controllers/synonym.controller")

const router = Router()
const adminPolice = require("../middleware/adminPolice")
const Validators = require("../middleware/validator")

router.get("/",getSynonyms)
router.post("/",Validators("synonym"),addSynonym)
router.get("/:id",getSynonym)
// router.put("/:id",adminPolice,updateSynonym)
// router.delete("/:id",adminPolice,deleteSynonym)

module.exports = router