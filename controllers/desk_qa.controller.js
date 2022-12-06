const deskQa = require("../models/Desc_QA");
const QuestionA = require("../models/QuestionA");
const Description = require("../models/Description");
const ApiError = require("../error/ApiError");
const mongoose = require('mongoose')

const addDeskQa = async (req, res) => {
  try {
    const { qa_id, desc_id } = req.body;
    let isValid = mongoose.Types.ObjectId(qa_id)
    if(!isValid) return res.error(404,{message:"qa_id xato kiritilgan"})
    let check = await QuestionA.findById(qa_id);
    let check2 = await Description.findById(desc_id);
    if (!check) return res.error(400, {message:"qa_id xato kiritilgan"});
    if (!check2) return res.error(400,{message: "desc_id xato kiritilgan"});
    const data = await deskQa({ qa_id, desc_id });
    res.ok(200, "OK. Qa_id va Desc_id qo'shildi deb hisoblayvering!");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getDeskQas = async (req, res) => {
  try {
    const data = await deskQa.find({});
    if (data.length < 1) return res.error(400,{message: "Information is not found"});
    // console.log(data)
    res.send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getDeskQa = async (req, res) => {
  try {
    const id = req.params.id;
    let isValid = mongoose.Types.ObjectId.isValid(id)
    const idData = await deskQa.findById(id);
    if (!idData) return res.error(400,{message: "Id xato kiritilgan"});
    res.send(idData);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateDeskQa = async (req, res) => {
  try {
    const id = req.params.id;
    const idData = await deskQa.findById(id);
    const { qa_id, desc_id } = req.body;
    let check = await QuestionA.findById(qa_id);
    let check2 = await Description.findById(desc_id);
    if (check == null || check2 == null)
      return res.error(400,{message: "desc_id yoki qa_id noto'g'ri kiritilgan"});
    if (!idData) return res.error(400, {message:"Id xato kiritilgan"});
    await deskQa.findByIdAndUpdate({ _id: id }, { qa_id, desc_id });
    res.ok(200,{ message: "Everything is Ok. deskQainfo has been updated" });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteDeskQa = async (req, res) => {
  try {
    const id = req.params.id;
    const idData = await deskQa.findById(id);
    if (idData.length < 1)
      return res.error(400,{ message: "Information not found which is Id bodied" });
    await deskQa.findByIdAndDelete(id);
    res.ok(200,{ message: "Everything is OK. deskQaInfo has been deleted" });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getDeskQa,
  getDeskQas,
  deleteDeskQa,
  updateDeskQa,
  addDeskQa,
};
