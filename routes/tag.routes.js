const {Router} = require('express');
const { addTag, getTags, getTag, updateTag, deleteTag } = require('../controllers/tag.controller');

const router = Router()
const adminPolice = require("../middleware/adminPolice")
const Validators = require("../middleware/validator")
router.get("/",getTags)
router.post("/",Validators("tag"),addTag)
router.get("/:id",getTag)
// router.put("/:id",adminPolice,updateTag)
// router.delete("/:id",adminPolice,deleteTag)

module.exports = router