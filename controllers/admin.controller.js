const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("../services/JwtService");
const config = require("config");
const ApiError = require("../error/ApiError");
const emailValidation = require("../helpers/emailValidation");
const uuid = require("uuid")
const mailService = require("../services/MailService")
const generate = require("generate-password")


const addAdmin = async (req, res) => {
  try {
    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;
    const adminHashedPassword = bcrypt.hashSync(admin_password, 7);
    const admin_activation_link = uuid.v4()
    const data = await Admin({
      admin_name,
      admin_email,
      admin_password: adminHashedPassword,
      admin_is_active,
      admin_is_creator,
      admin_activation_link
    });
    await data.save();
    await mailService.sendActivationMail(
      admin_email,
      `${config.get("api_url")}/api/admin/activate/${admin_activation_link}`
    )
    const payload = {
      id:data._id,
      admin_is_active:data.admin_is_active
    }
    const tokens = jwt.generateTokens(payload)
    data.admin_token = tokens.refreshToken
    await data.save()
    res.cookie("refreshToken",tokens.refreshToken,{
      maxAge:config.get("refresh_ms"),
      httpOnly:true
    })
    res.ok(200,{...tokens,admin:payload});
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getAdmins = async (req, res) => {
  try {
    const data = await Admin.find({});
    if (!data.length)
      return res.error(400, { message: "Information not found" });
    // res.send(data);
    res.status(200).send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    let isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) return res.error(300, "Id is Incorrect");
    const idData = await Admin.findById(id);
    if (!idData) return res.error(400, { message: "Information not found" });
    // res.ok(200, idData);
    res.status(200).send(data);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    let isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) return res.error(300, { message: "Id is Incorrect" });
    const idData = await Admin.findById(id);
    if (!idData)
      return res.error(400, { message: "Information was not found" });
    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
      admin_reg_data,
    } = req.body;
    const adminHashedPassword = bcrypt.hashSync(admin_password, 7);
    await Admin.findByIdAndUpdate(
      { _id: id },
      {
        admin_name,
        admin_email,
        admin_password: adminHashedPassword,
        admin_is_active,
        admin_is_creator,
        admin_reg_data,
      }
    );
    res.ok(200, "OK.Info was updated");
  } catch (error) {
    ApiError.internal({
      message: error,
      friendlyMsg: "Serverdan xatolik",
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    let isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) return res.error(300, { message: "Id is Incorrect" });
    const idData = await Admin.findById(id);
    if (!idData)
      return res.error(400, { message: "Information was not found" });
    await Admin.findByIdAndDelete(id);
    res.ok(200, "Ok. AdminInfo is deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    let admin;
    const { login, admin_password } = req.body;
    if (emailValidation(login))
      admin = await Admin.findOne({ admin_email: login });
    if (!admin)
      return res.error(400, { friendlyMsg: "Email or Password is incorrect" });
    const validPassword = bcrypt.compareSync(
      admin_password,
      admin.admin_password
    );
    if (!validPassword)
      return res.error(400, { friendlyMsg: "Email or Password incorrect" });
    const payload = {
      id: admin.id,
      admin_is_active: admin.admin_is_active,
      admin_is_creator: admin.admin_is_creator,
    };
    const tokens = jwt.generateTokens(payload);
    admin.admin_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.ok(200, tokens);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    let admin;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token is not found" });
    admin = await Admin.findOneAndUpdate(
      { admin_token: refreshToken },
      { admin_token: "" },
      { new: true }
    );
    if (!admin) return res.error(400, { friendlyMsg: "Token topilmadi" });
    res.clearCookie("refreshToken");
    res.ok(200, admin);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const refreshAdminToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.error(400, { friendlyMsg: "Token is not found" });
    const adminDataFromCookie = await jwt.verifyRefresh(refreshToken);
    const adminDataFromDb = await Admin.findOne({ admin_token: refreshToken });
    if (!adminDataFromCookie || !adminDataFromDb) {
      return res.error(400, { friendlyMsg: "Admin is not registered" });
    }
    const admin = await Admin.findById(adminDataFromCookie.id);
    if (!admin) return res.error(400, { friendlyMsg: "ID is incorrect" });
    const payload = {
      id: admin.id,
      admin_is_active: admin.admin_is_active,
      admin_is_creator: admin.admin_is_creator,
    };
    const tokens = jwt.generateTokens(payload);
    admin.admin_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    res.ok(200, tokens);
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const activateLink = async (req,res) =>{
  try {
    const link = req.params.link
    const data = await Admin.findOne({admin_activation_link:link})
    if(!data) return res.error(404,{friendlyMsg:"Data is not found"})
    if(data.admin_is_active == true) return res.error(401,{friendlyMsg:"The admin has already been activated "})
    data.admin_is_active = true
    await data.save()
    res.ok(200,{message:"Admin is activated"})
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
}

const forgetPassword = async (req,res) =>{
  try {
    const {admin_email} = req.body
    const admin = await Admin.findOne({admin_email})
    if(!admin) return res.error(400,{friendlyMsg:"Information is not found"})
    let password = generate.generate({
      length: 10,
      numbers: true
    });
    await mailService.sendPasswordMail(
      admin_email,
      password
    )
    let hashpassword = bcrypt.hashSync(password,7)
    admin.admin_password = hashpassword
    await admin.save()
    res.ok(200,{message:"We send new password to your email"})
  } catch (error) {
    ApiError.internal(res, {
      message: error,
      friendlyMsg: "Serverda hatolik",
    });
  }
}

module.exports = {
  getAdmin,
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logout,
  refreshAdminToken,
  activateLink,
  forgetPassword
};
