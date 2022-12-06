const {logger,expressWinston,errorLogger} = require("express-winston")
const winston = require('winston');
const config = require('config');
require("winston-mongodb")

const { createLogger, format, transports } = require('winston');
const { metadata,json,prettyPrint,timestamp} = format;


const logPolice = logger({
    transports: [
      new transports.Console(),
      new transports.MongoDB({
        db:config.get("dbUri"),
        options: {useUnifiedTopology:true},
        metaKey:"meta"
      }),
    ],
    format: format.combine(
      json(),prettyPrint(),metadata()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});

const errLogger = errorLogger({
    transports: [
          new transports.Console(),
        
      new transports.MongoDB({
        db: config.get("dbUri"),
        options: { useUnifiedTopology: true },
        storeHost: true,
        capped: true,
      }),
      
    ],
    format: format.combine(format.colorize(), format.metadata()),
  });


module.exports = {
    logPolice,
    errLogger
}