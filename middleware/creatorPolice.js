const jwt = require("../services/JwtService");
const config = require("config");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(403).json({ message: "Admingaa ruxsat berilmagan" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Adminga1 ruxsat berilmagan" });
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
    console.log(decodedData);
    if (!decodedData.admin_is_active) {
      return res
        .status(403)
        .send({ message: "Error : Adminga2 ruxsat berilmagan" });
    }
    if (req.params.id !== decodedData.id)
      return res.status(403).send({
        message: "Faqat o'ziga tegishli ma'lumotlarni o'chirishi mumkin",
      });
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Admin ro'yxatdan o'tmagan" });
  }
};

async function to(promise) {
  return promise.then((response) => [null, response]).catch((error) => [error]);
}
