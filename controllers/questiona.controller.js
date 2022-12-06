const QuestionA = require("../models/QuestionA");
const Author = require("../models/Author");

const ApiError = require("../error/ApiError");

const addQuestionAnswer = async (req, res) => {
  try {
    const { question, answer, is_checked, expert_id } = req.body;
    const idData = await Author.findById(expert_id);
    if (!idData)
      return res.error(400, {
        message: "Berilgan javob va id expertniki emas!",
      });
    const data = await QuestionA({ question, answer, is_checked, expert_id });
    await data.save();
    res.ok(200, "Evertything is OK. Question and Answer is added.");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getQuestionAnswers = async (req, res) => {
  try {
    const data = await QuestionA.find({});
    if (!data) return res.error(400, { message: "Ma'lumot yo'q" });
    res.send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getQuestionAnswer = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await QuestionA.findById(id);
    if (!data)
      return res.error(400, { message: "Id bo'yicha ma'lumot topilmadi" });
    res.send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateQuestionAnswer = async (req, res) => {
  try {
    const id = req.params.id;
    const { question, answer, is_checked, expert_id } = req.body;
    let check = await Author.findById(expert_id);
    if (!check) return res.error(400, {message:"Berilgan id expertga tegishli emas!"});
    await Author.findByIdAndUpdate(
      { _id: id },
      { question, answer, is_checked, expert_id }
    );
    res.ok(200, "OK. Question and Answer info is updated!");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteQuestionAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const idData = await QuestionA.findById({ _id: id });
    if (!idData)
      return res.error(400, { message: "Id bo'yicha ma'lumot yo'q" });
    await QuestionA.findByIdAndDelete({ _id: id });
    res.ok(200, "Everything is Ok. QuestionanswerInfo is deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  addQuestionAnswer,
  getQuestionAnswer,
  getQuestionAnswers,
  updateQuestionAnswer,
  deleteQuestionAnswer,
};
