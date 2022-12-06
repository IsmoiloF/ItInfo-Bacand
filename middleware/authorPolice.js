const jwt = require("../services/JwtService");
const config = require("config");
const to = require("../helpers/functionHandler");

module.exports = async function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
    }
    // const decodedData = jwt.verify(token,config.get("secret"))
    [err, decodedData] = await to(
      jwt.verifyAccess(token, config.get("secret"), {})
    );
    if (err) {
      console.log(err.message);
      return res.error(400, { friendlyMsg: err.message });
    }
    req.author = decodedData;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Avtor ro'yxatdan o'tmagan" });
  }
};
