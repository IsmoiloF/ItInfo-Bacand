const Synonym = require("../models/Synonym");
const Description = require("../models/Description");
const Dictionary = require("../models/Dictionary");

const ApiError = require("../error/ApiError")



const addSynonym = async (req, res) => {
  try {
    const { desc_id, dict_id } = req.body;
    let check = await Description.findById(desc_id);
    let check2 = await Dictionary.findById(dict_id);
    if (check == null || check2 == null)
      return res.error(404,{message:"Desc_id or Dict_id is Incorrect. Maybe both of them"});
    const data = await Synonym({ desc_id, dict_id });
    await data.save();
    res.ok(200, "Synonym is added Bro!");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSynonym = async (req, res) => {
  try {
    const id = req.params.id;
    let check = await Synonym.findById(id);
    if (check == null) return res.error(400, {message:"Id is incorrect"});
    // res.ok(200, check);
    res.send(check)
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSynonyms = async (req, res) => {
  try {
    const data = await Synonym.find({});
    if (data == null) return res.error(400, {message:"Information is not found"});
    res.send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateSynonym = async (req, res) => {
  try {
    const id = req.params.id;
    
    const { desc_id, dict_id } = req.body;
    let check = await Description.findById(desc_id);
    let check2 = await Dictionary.findById(dict_id);
    if (check == null || check2 == null)
      return res.error(404,{message:"Desc_id or Dict_id is Incorrect. Maybe both of them"});
    await Synonym.findByIdAndUpdate({ _id: id }, { desc_id, dict_id });
    res.ok(200, "Ok. Synonyminfo was updated");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteSynonym = async (req, res) => {
  try {
    const id = req.params.id;
    let idData = await Synonym.findOne({ id });
    if (idData == null) return res.error(400, {message:"Id is incorrect"});
    await Synonym.findByIdAndDelete(id);
    res.ok(200, "Ok. synonymInfo was deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getSynonym,
  getSynonyms,
  addSynonym,
  updateSynonym,
  deleteSynonym,
};
