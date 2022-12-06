const {Router} = require("express")
const express = require("express")

express.application.prefix = express.Router.prefix = function(
  path,
  configure
){
  const router = express.Router()
  this.use(path,router)
  configure(router)
  return router
};
const{
  getAdmins,
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logout,
  refreshAdminToken,
  forgetPassword,
  activateLink
} = require("../controllers/admin.controller");
const { deleteCategory,updateCategory } = require("../controllers/category.controller");
const { updateDescription, deleteDescription } = require("../controllers/description.controller");
const { updateDescTopic, deletedescTopic } = require("../controllers/desc_topic.controller");
const { updateDeskQa, deleteDeskQa } = require("../controllers/desk_qa.controller");
const { updateDictionary, deleteDictionary } = require("../controllers/dictionary.controller");
const { updateMedia, deleteMedia } = require("../controllers/media.controller");
const { deleteQuestionAnswer, updateQuestionAnswer } = require("../controllers/questiona.controller");
const { deleteSocial, updateSocial } = require("../controllers/social.controller");
const { updateSynonym, deleteSynonym } = require("../controllers/synonym.controller");
const { updateTag, deleteTag } = require("../controllers/tag.controller");
const { addTopic, updateTopic, deleteTopic } = require("../controllers/topic.controller");

const adminPolice = require("../middleware/adminPolice");
const Validator = require("../middleware/validator")
const creatorPolice = require("../middleware/creatorPolice")
const router = Router();
router.prefix("/",(rout) =>{
  rout.prefix("/",(admin) =>{
    admin.get("/",adminPolice,getAdmins)
    admin.get("/refresh",refreshAdminToken)
    admin.get("/:id",getAdmin)
    admin.get("/activate/:link",activateLink)
    admin.post("/",Validator("admin"),addAdmin)
    admin.post("/forgetpassword",forgetPassword)
    admin.post("/login",Validator("email_admin"),loginAdmin)
    admin.post("/logout",logout)
    admin.put("/:id",creatorPolice,Validator("admin"),updateAdmin)
    admin.delete("/:id",creatorPolice,deleteAdmin)


    admin.put("/category/:id",adminPolice,updateCategory)
    admin.delete("/category/:id",adminPolice,deleteCategory)

    admin.put("/desctopic/:id",adminPolice,updateDescTopic)
    admin.delete("/desctopic/:id",adminPolice,deletedescTopic)

    admin.put("/description/:id",adminPolice,updateDescription)
    admin.delete("/description/:id",adminPolice,deleteDescription)

    admin.put("/deskqa/:id",adminPolice,updateDeskQa)
    admin.delete("/deskqa/:id",adminPolice,deleteDeskQa)

    admin.put("/dictionary/:id",adminPolice,updateDictionary)
    admin.delete("/dictionary/:id",adminPolice,deleteDictionary)

    admin.put("/media/:id",adminPolice,updateMedia)
    admin.delete("/media/:id",adminPolice,deleteMedia)

    admin.put("/question_answer/:id",adminPolice,updateQuestionAnswer)
    admin.delete("/question_answer/:id",adminPolice,deleteQuestionAnswer)

    admin.put("/social/:id",adminPolice,updateSocial)
    admin.delete("/social/:id",adminPolice,deleteSocial)

    admin.put("/synonym/:id",adminPolice,updateSynonym)
    admin.delete("/synonym/:id",adminPolice,deleteSynonym)

    admin.put("/tag/:id",adminPolice,updateTag)
    admin.delete("/tag/:id",adminPolice,deleteTag)

    admin.post("/topic/",adminPolice,addTopic)
    admin.put("/topic/:id",adminPolice,updateTopic)
    admin.delete("/topic/:id",adminPolice,deleteTopic)

  })
})

module.exports = router