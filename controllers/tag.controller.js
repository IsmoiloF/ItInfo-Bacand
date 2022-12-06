const Tag = require("../models/Tag");
const Topic = require("../models/Topic");
const Category = require("../models/Category");

const ApiError = require("../error/ApiError")

const addTag = async (req, res) => {
  try {
    const { topic_id, category_id } = req.body;
    let check = await Topic.findById(topic_id);
    let check2 = await Category.findById(category_id);
    if (!check) return res.error(400, { message: "topic_id xato kiritilgan" });
    if (!check2)
      return res.error(400, { message: "category_id xato kiritilgan" });
    const response = await Tag({ topic_id, category_id });
    await response.save();
    res.ok(200, { message: "Everything is OK. Tag is added" });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getTags = async (req, res) => {
  try {
    const data = await Tag.find({});
    if (!data) return res.error(400,{message: "Information is not found"});
    res.send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getTag = async (req, res) => {
  try {
    const id = req.params.id;
    const idData = await Tag.findById(id);
    if (!idData) return res.error(400,{message: "Id bo'yicha ma'lumot topilmadiku!"});
    res.send(idData);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateTag = async (req, res) => {
  try {
    const id = req.params.id;
    const { topic_id, category_id } = req.body;
    let check = await Topic.findById(topic_id);
    let check2 = await Category.findById(category_id);
    if (!check) return res.error(400, {message:"Topic_id xato kiritilgan."});
    if (!check2) return res.error(400,{message: "Category_id xato kiritilgan"});
    await Tag.findByIdAndUpdate({ _id: id }, { topic_id, category_id });
    res.ok(200, "Everything is OK. tagInfo is updated");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteTag = async (req, res) => {
  try {
    const id = req.params.id;
    const idData = await Tag.findById(id);
    if (!idData) return res.error(400,{message: "id bo'yicha ma'lumot yo'q"});
    await Tag.findByIdAndDelete(id);
    res.ok(200, "Everything is Ok. tagInfo is deleted");
  } catch (error) {}
};
module.exports = {
  addTag,
  getTag,
  getTags,
  updateTag,
  deleteTag,
};
