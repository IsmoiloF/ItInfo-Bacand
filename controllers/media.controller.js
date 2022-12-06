const Media = require("../models/Media");

const ApiError = require("../error/ApiError")



const addMedia = async (req, res) => {
  try {
    const { media_name, media_file, target_table_name, target_table_id } =
      req.body;
    const data = await Media({
      media_name,
      media_file,
      target_table_name,
      target_table_id,
    });
    await data.save();
    res.ok(200, "Ok. Media is added");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getMedias = async (req, res) => {
  try {
    const data = await Media.find({});
    if (!data) res.error(400,{message:"Ma'lumot topilmadi"});
    res.send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};
const getMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const idData = await Media.findById(id);
    if (!idData) return res.error(200,{message: "Id xato berilgan."});
    // res.ok(200, idData);
    res.send(idData)
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const { media_name, media_file, target_table_name, target_table_id } =
      req.body;
    const idData = await Media.findById(id);
    if (!idData) return res.error(404,{message:"Not found with entered Id"});
    await Media.findByIdAndUpdate(
      { _id: id },
      { media_name, media_file, target_table_name, target_table_id }
    );
    res.ok(200, "Everything is Ok. mediaInfo is updated");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};
const deleteMedia = async (req, res) => {
  try {
    const id = req.params.id;
    const idData = await Media.findById(id);
    if (!idData) return res.error(404,{message:"Not found with entered Id"});
    await Media.findByIdAndDelete(id);
    res.ok(200, "Everything is Ok. mediaInfo is deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  addMedia,
  getMedias,
  getMedia,
  updateMedia,
  deleteMedia,
};
