const {Router} = require("express")
const { addDescription, getDescriptions, getDescription, deleteDescription, updateDescription } = require("../controllers/description.controller")

const router = Router()
const Validators = require("../middleware/validator")

router.get("/",getDescriptions)
router.post("/",Validators("description"),addDescription)
router.get("/:id",getDescription)
// router.delete("/:id",deleteDescription)


module.exports = router