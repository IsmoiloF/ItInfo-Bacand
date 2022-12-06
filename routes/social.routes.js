const {Router} = require("express")
const { getSocials, addSocial, getSocial, updateSocial, deleteSocial } = require("../controllers/social.controller")

const router = Router()
const adminPolice = require("../middleware/adminPolice")
const Validators = require("../middleware/validator")

router.get("/",getSocials)
router.post("/",Validators("social"),addSocial)
router.get("/:id",getSocial)
// router.put("/:id",adminPolice,updateSocial)
// router.delete("/:id",adminPolice,deleteSocial)

module.exports = router