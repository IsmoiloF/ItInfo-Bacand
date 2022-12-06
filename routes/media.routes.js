const {Router} = require("express")
const { getMedias, getMedia, addMedia, updateMedia, deleteMedia } = require("../controllers/media.controller")

const router = Router()
const adminPolice = require("../middleware/adminPolice")
const Validators = require("../middleware/validator")

router.get("/",getMedias)
router.post("/",Validators("media"),addMedia)
router.get("/:id",getMedia)
// router.put("/:id",adminPolice,updateMedia)
// router.delete("/:id",adminPolice,deleteMedia)

module.exports = router