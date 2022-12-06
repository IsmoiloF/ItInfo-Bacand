const {Router} = require("express")
const { getAuthors, addAuthor, getAuthor, updateAuthor, deleteAuthor, loginAuthor, logout, refreshAuthorToken, activateLink, forgetPassword } = require("../controllers/author.controller")

const router = Router()
const authorPolice = require("../middleware/authorPolice")
const authorRolePolice = require("../middleware/authorRolePolice")
const Validators = require("../middleware/validator")


router.get("/",getAuthors)
router.post("/",Validators("author"),addAuthor)
router.post("/login",Validators("email_author"),loginAuthor)
router.post("/logout",logout)
router.post("/forgetpassword",forgetPassword)
router.get("/refresh",refreshAuthorToken)
router.get("/activate/:link",activateLink)
router.get("/:id",getAuthor)
router.put("/:id",authorPolice,updateAuthor)
router.delete("/:id",authorPolice,deleteAuthor)

module.exports = router