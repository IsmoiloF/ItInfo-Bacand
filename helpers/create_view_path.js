const path = require('path');

const createViewPath = (page) =>
  path.resolve(__dirname, "../views", `${page}.ejs`);
  
const errorHandler = (res,error) =>
      res.status(500).send("Xatolik bor"+ error)

module.exports = {
    createViewPath,
    errorHandler
}

