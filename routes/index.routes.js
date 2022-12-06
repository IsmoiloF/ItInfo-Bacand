const {Router} = require("express")

const router = Router()
const {createViewPath} = require("../helpers/create_view_path")


const dictionaryRoute = require("./dictionary.routes")
const categoryRoute = require("./category.routes")
const descriptionRoute = require("./description.routes")
const socialRoute = require("./social.routes")
const authorRoute = require("./author.routes")
const authorSocialRoute = require("./author_social.routes")
const topicRouter = require("./topic.routes")
const tagRouter = require("./tag.routes")
const question_answerRouter = require("./questionanswer.routes")
const mediaRouter = require("./media.routes")
const deskqaRouter = require("./desk_qa.routes")
const descTopicRouter = require("./desc_topic.routes")
const synonymRouter = require("./synonym.routes")
// const adminRouter = require("./admin.routes")
const userRouter = require("./user.routes")
const admin1Router = require("./admin1.routes")
const responses = require("./responses.routes") 

router.use(responses)

router.get("/", (req, res) => {
    res.render(createViewPath("index"), { title: "Home", page_name: "home" });
  });

router.use("/api/dictionary",dictionaryRoute)
router.use("/api/category",categoryRoute)
router.use("/api/description",descriptionRoute)
router.use("/api/social",socialRoute)
router.use("/api/author",authorRoute)
router.use("/api/author_social",authorSocialRoute)
router.use("/api/topic",topicRouter)
router.use("/api/tag",tagRouter)
router.use("/api/question_answer",question_answerRouter)
router.use("/api/media",mediaRouter)
router.use("/api/deskqa",deskqaRouter)
router.use("/api/desctopic",descTopicRouter)
router.use("/api/synonym",synonymRouter)
router.use("/api/admin",admin1Router)
router.use("/api/user",userRouter)

module.exports = router