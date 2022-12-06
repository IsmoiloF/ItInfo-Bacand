const {Router} = require("express")
const { getDeskQas, addDeskQa, getDeskQa, updateDeskQa, deleteDeskQa } = require("../controllers/desk_qa.controller")

const router = Router()
const adminPolice = require("../middleware/adminPolice")
const Validators = require("../middleware/validator")

router.get("/",getDeskQas)
router.post("/",Validators("deskqa"),addDeskQa)
router.get("/:id",getDeskQa)
// router.put("/:id",adminPolice,updateDeskQa)
// router.delete("/:id",adminPolice,deleteDeskQa)

module.exports = router