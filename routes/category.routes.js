const {Router} = require("express")
const { addCategory, getCategories, getCategory, deleteCategory, updateCategory } = require("../controllers/category.controller")

const router = Router()
const Validators = require("../middleware/validator")

router.get("/",getCategories)
router.post("/",Validators("category"),addCategory)
router.get("/:id",getCategory)


module.exports = router