const {Router} = require("express")
const { getDescTopics, addDescTopic, getDescTopic, updateDescTopic, deletedescTopic } = require("../controllers/desc_topic.controller")

const router = Router()
const adminPolice = require("../middleware/adminPolice")
const Validators = require("../middleware/validator")


router.get("/",getDescTopics)
router.post("/",Validators("desc_topic"),addDescTopic)
router.get("/:id",getDescTopic)
// router.put("/:id",adminPolice,updateDescTopic)
// router.delete("/:id",adminPolice,deletedescTopic)

module.exports = router