const admin = require("./admin.validator")
const user = require("./user.validator")
const email_pass = require("./email_pass.validator")
const author = require("./author.validator")
const email_admin = require("./email_admin.validator")
const email_author = require("./email.author.validator")
const authorSocial = require("./authorSocial.validator")
const category = require("./category.validator")
const desc_topic = require("./desc_topic.validator")
const description = require("./description.validator")
const deskqa = require("./deskqa.validator")
const dictionary = require("./dictionary.validator")
const media = require("./media.validator")
const questiona = require("./questiona.validator")
const social = require("./social.validator")
const synonym = require("./synonym.validator")
const tag = require("./tag.validator")
const topic = require("./topic.validator")

module.exports = {
    admin,
    user,
    email_pass,
    author,
    email_admin,
    email_author,
    authorSocial,
    category,
    desc_topic,
    description,
    deskqa,
    dictionary,
    media,
    questiona,
    social,
    synonym,
    tag,
    topic
}