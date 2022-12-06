const Social = require("../models/Social");

const ApiError = require("../error/ApiError")

const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    const data = await Social({ social_name, social_icon_file });
    await data.save();
    res.ok(200, { message: `Social is added !` });
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSocials = async (req, res) => {
  try {
    const result = await Social.find({});
    if (!result) res.error(400, {message:"Ma'lumot topilmadi"});
    // res.ok(200, result);
    res.send(result)
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSocial = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Social.findById(id);
    if (!data) res.error(400, {message:"Id bo'yicha ma'lumot topilmadi"});
    res.send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateSocial = async (req, res) => {
  try {
    const id = req.params.id;
    const { social_name, social_icon_file } = req.body;
    const idData = Social.findById(id);
    if (!idData) return res.error(400, {message:"Id incorrect"});
    const data = await Social.findByIdAndUpdate(
      { _id: id },
      { social_name, social_icon_file }
    );
    await data.save();
    res.ok(200, "Social is updated");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteSocial = async (req, res) => {
  try {
    const id = req.params.id;
    const info = await Social.findOne({ _id: id });
    if (!info) res.error(400,{message: "Id bo'yicha ma'lumot topilmadi"});
    await Social.findByIdAndDelete(id);
    res.ok(200, "Social is deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  addSocial,
  getSocial,
  getSocials,
  updateSocial,
  deleteSocial,
};
