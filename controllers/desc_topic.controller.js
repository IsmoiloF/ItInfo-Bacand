const descTopic = require("../models/Desc_Topic");
const Description = require("../models/Description");
const Topic = require("../models/Topic");
const mongoose = require("mongoose");
const ApiError = require("../error/ApiError");

const addDescTopic = async (req, res) => {
  try {
    const { desc_id, topic_id } = req.body;
    let validDesc = mongoose.Types.ObjectId.isValid(desc_id);
    let topicDesc = mongoose.Types.ObjectId.isValid(topic_id);
    if (!validDesc || !topicDesc)
      return res.error(404, { message: "Id is incorrect" });
    let check = await Description.findById(desc_id);
    let check2 = await Topic.findById(topic_id);
    if (check == null || check2 == null)
      return res.error(404, { message: "desc_id or topic_id is incorrect!" });
    const data = await descTopic({ desc_id, topic_id });
    await data.save();
    res.ok(200, "Ok. descTopic is added");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getDescTopics = async (req, res) => {
  try {
    const data = await descTopic.find({});
    if (!data) return res.error(400, { message: "Data is not found" });
    res.send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getDescTopic = async (req, res) => {
  try {
    const id = req.params.id;
    let isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) return res.error(400, { message: "Id is incorrect" });
    const idData = await descTopic.findById(id);
    if (!idData) return res.error(400, { message: "Information not found" });
    // res.ok(200, idData);
    res.status(200).send(idData);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateDescTopic = async (req, res) => {
  try {
    const id = req.params.id;
    const { desc_id, topic_id } = value;
    let check = await Description.findById(desc_id);
    let check2 = await Topic.findById(topic_id);
    if (check == null || check2 == null)
      return res.error(403, { message: "desc_id or topic_id is incorrect!" });
    const idData = await descTopic.findById(id);
    if (!idData) return res.error(400, { message: "id is incorrect" });
    await descTopic.findByIdAndUpdate({ _id: id }, { desc_id, topic_id });
    res.ok(200, "Ok. descTopicInfo was updated");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deletedescTopic = async (req, res) => {
  try {
    const id = req.params.id;
    const idData = await descTopic.findById(id);
    if (!idData) return res.error(404, { message: "id is incorrect" });
    await descTopic.findByIdAndDelete(id);
    res.ok(200, "OK.desctopicInfo has been deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getDescTopics,
  addDescTopic,
  getDescTopic,
  updateDescTopic,
  deletedescTopic,
};
