const {Router} = require("express")
const { getAuthorSocials, addAuthorSocial, getAuthorSocial, updateAuthorSocial, deleteAuthorSocial } = require("../controllers/authorSocial.controller")

const router = Router()
const authorPolice = require("../middleware/authorPolice")
const Validator = require("../middleware/validator")


router.get("/",getAuthorSocials)
router.post("/",Validator("authorSocial"),addAuthorSocial)
router.get("/:id",getAuthorSocial)
router.put("/:id",authorPolice,updateAuthorSocial)
router.delete("/:id",authorPolice,deleteAuthorSocial)

module.exports = router